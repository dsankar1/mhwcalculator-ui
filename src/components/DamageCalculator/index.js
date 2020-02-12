import _ from 'lodash';
import qs from 'qs';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { makeStyles, Container, Grid, Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import { SubtitleContext } from '../../App';
import calculateDamage from './calculator';
import { WeaponType, Sharpness } from './calculator';
import SearchBar from './components/SearchBar';
import WeaponInput from './components/WeaponInput';
import SkillsInput from './components/SkillsInput';
import ItemsInput from './components/ItemsInput';
import { BuildAccessor } from './calculator';

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

    const calculations = React.useMemo(() => calculateDamage(build), [build]);

    console.log('Build', build);
    console.log('Calculations', calculations);

    return (
        <Container className={classes.container}>
            <Grid spacing={1} container>
                <Grid item xs={12}>
                    {JSON.stringify(calculations.buffs)}
                </Grid>
                <Grid item xs={8}>
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
                                    setBuild(build => ({
                                        ...build,
                                        ...weapon
                                    }));
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={7} md={6}>
                    <SkillsInput
                        grid={{
                            xs: 12,
                            sm: 6
                        }}
                        value={_.get(build, 'buffs')}
                        onChange={skills => {
                            handleChange('buffs', skills);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={5} md={6}>
                    <ItemsInput
                        grid={{
                            xs: 12,
                            md: 6
                        }}
                        value={_.get(build, 'buffs')}
                        onChange={items => {
                            handleChange('buffs', items);
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default DamageCalculator;
