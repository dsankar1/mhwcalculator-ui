import _ from 'lodash';
import qs from 'qs';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { makeStyles, Container, Grid, Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import { SubtitleContext } from '../../App';
import calculateDamage, { BuildAccessor, WeaponType, Sharpness } from './calculator';
import SearchBar from './components/SearchBar';
import WeaponInput from './components/WeaponInput';
import AugmentsInput from './components/AugmentsInput';
import SkillsInput from './components/SkillsInput';
import ItemsInput from './components/ItemsInput';

const getInitialBuild = location => {
    const rawQuery = qs.parse(_.get(location, 'search'), {
        ignoreQueryPrefix: true
    });
    const query = _.transform(rawQuery, (acc, value, key) => {
        if (_.isEqual(key, 'buffs')) {
            const split = _.split(value, /,\s?/);
            _.set(acc, key, split);
        } else {
            _.set(acc, key, value);
        }
    }, {});

    let cached = {};
    try {
        const json = localStorage.getItem('build');
        if (_.isString(json)) {
            cached = JSON.parse(json);
        }
    } catch (e) {
        console.error(e);
    }

    return _.defaults(query, cached, {
        attack: 693,
        element: 100,
        hiddenElement: true,
        weaponType: WeaponType.LONG_SWORD,
        sharpness: Sharpness.BLUE
    });
}

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    }
}));

export const DamageCalculator = props => {
    const classes = useStyles();
    const setSubtitle = useContext(SubtitleContext);
    const [build, setBuild] = useState(getInitialBuild(props.location));

    useEffect(() => {
        setSubtitle('Damage Calculator');
    }, [setSubtitle]);

    useEffect(() => {
        localStorage.setItem('build', JSON.stringify(build));
    }, [build]);

    const handleChange = useCallback((name, value) => {
        setBuild(build => ({
            ...build,
            [name]: value
        }));
    }, [setBuild]);

    const calculations = React.useMemo(() => {
        const cleanedBuild = _.omit(build, ['augments', 'skills', 'items']);
        const buffs = _.concat(
            _.get(build, 'augments', []),
            _.get(build, 'skills', []),
            _.get(build, 'items', [])
        );
        return calculateDamage({ ...cleanedBuild, buffs });
    }, [build]);

    console.log('Build', build);
    console.log('Calculations', calculations);

    return (
        <Container className={classes.container}>
            <Grid spacing={1} container>
                <Grid item xs={12} md={9}>
                    <Card>
                        <CardHeader
                            title='Weapon'
                            action={
                                <SearchBar
                                    onChange={weapon => {
                                        handleChange('weapon', _.defaults(weapon, build.weapon));
                                    }}
                                />
                            }
                        />
                        <Divider />
                        <CardContent>
                            <WeaponInput
                                value={_.pick(build, [
                                    BuildAccessor.WEAPON_TYPE,
                                    BuildAccessor.ATTACK,
                                    BuildAccessor.ELEMENT,
                                    BuildAccessor.HIDDEN_ELEMENT,
                                    BuildAccessor.AFFINITY_PCT,
                                    BuildAccessor.SHARPNESS
                                ])}
                                onChange={weapon => {
                                    setBuild(build => ({ ...build, ...weapon }));
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <AugmentsInput
                        grid={{
                            xs: 12,
                            sm: 4,
                            md: 12
                        }}
                        value={_.get(build, 'augments')}
                        onChange={augments => {
                            setBuild(build => ({ ...build, augments }));
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <SkillsInput
                        grid={{
                            xs: 12,
                            sm: 6
                        }}
                        value={_.get(build, 'skills')}
                        onChange={skills => {
                            setBuild(build => ({ ...build, skills }));
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <ItemsInput
                        value={_.get(build, 'items')}
                        onChange={items => {
                            setBuild(build => ({ ...build, items }));
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default DamageCalculator;
