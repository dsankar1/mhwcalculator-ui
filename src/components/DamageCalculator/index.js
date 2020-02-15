import _ from 'lodash';
import qs from 'qs';
import React from 'react';
import useWindowScroll from '@react-hook/window-scroll';
import { Refresh, KeyboardArrowUp } from '@material-ui/icons';
import { makeStyles, Container, Grid, Card, CardHeader, CardContent, Divider, IconButton, Tooltip, Fab, Fade } from '@material-ui/core';
import { SubtitleContext } from '../../App';
import calculateDamage, { BuildAccessor, WeaponType, Sharpness } from './calculator';
import ResultTable from './components/ResultTable';
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
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        color: theme.palette.background.paper,
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    }
}));

export const DamageCalculator = props => {
    const classes = useStyles();
    const setSubtitle = React.useContext(SubtitleContext);
    const [build, setBuild] = React.useState(getInitialBuild(props.location));

    React.useEffect(() => {
        setSubtitle('Damage Calculator');
    }, [setSubtitle]);

    React.useEffect(() => {
        localStorage.setItem('build', JSON.stringify(build));
    }, [build]);

    const scrollY = useWindowScroll(60);

    const results = React.useMemo(() => {
        const cleanedBuild = _.omit(build, ['augments', 'skills', 'items']);
        const buffs = _.concat(
            _.get(build, 'augments', []),
            _.get(build, 'skills', []),
            _.get(build, 'items', [])
        );
        return calculateDamage({ ...cleanedBuild, buffs });
    }, [build]);

    return (
        <Container className={classes.container}>
            <Grid spacing={1} container>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title='Results'
                            action={
                                <IconButton>
                                    <Tooltip
                                        title='Reset Build'
                                        enterDelay={1000}
                                    >
                                        <Refresh />
                                    </Tooltip>
                                </IconButton>
                            }
                        />
                        <Divider />
                        <CardContent>
                            <ResultTable combos={results.combos} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Card>
                        <CardHeader
                            title='Weapon'
                            action={
                                <SearchBar
                                    onChange={weapon => {
                                        setBuild(build => ({ ...build, ...weapon }));
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
            <Fade in={scrollY > 100}>
                <Fab
                    color='primary'
                    aria-label='Back to top'
                    className={classes.fab}
                    onClick={() => window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    })}
                >
                    <KeyboardArrowUp fontSize='large' />
                </Fab>
            </Fade>
        </Container>
    );
}

export default DamageCalculator;
