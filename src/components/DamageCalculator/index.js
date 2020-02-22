import _ from 'lodash';
import qs from 'qs';
import React from 'react';
import useWindowScroll from '@react-hook/window-scroll';
import { Refresh, KeyboardArrowUp } from '@material-ui/icons';
import { makeStyles, Container, Grid, Card, CardHeader, CardContent, IconButton, Tooltip, Fab, Fade } from '@material-ui/core';
import { SubtitleContext } from '../../App';
import calculateDamage, { BuildAccessor, WeaponType, Sharpness } from './calculator';
import ResultTable from './components/ResultTable';
import SearchBar from './components/SearchBar';
import WeaponInput from './components/WeaponInput';
import AugmentsInput from './components/AugmentsInput';
import SkillsInput from './components/SkillsInput';
import ItemsInput from './components/ItemsInput';

const defaultBuild = {
    weaponType: WeaponType.GREAT_SWORD,
    sharpness: Sharpness.BLUE
};

const getInitialBuild = location => {
    const rawQuery = qs.parse(_.get(location, 'search'), {
        ignoreQueryPrefix: true
    });

    const query = _.transform(rawQuery, (acc, value, key) => {
        _.set(acc, key, value);
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

    return {
        ...defaultBuild,
        ...cached,
        ...query
    };
}

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    },
    marginTop: {
        marginTop: theme.spacing(1)
    },
    resetBtn: {
        padding: theme.spacing(1),
        marginLeft: theme.spacing(1)
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

    const handleReset = React.useCallback(() => {
        localStorage.removeItem('build');
        setBuild(defaultBuild);
    }, [setBuild]);

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

    console.log('Results', results);

    return (
        <Container maxWidth='xl' className={classes.container}>
            <Grid spacing={1} container>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <ResultTable combos={results.combos} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardHeader
                            title='Weapon'
                            action={
                                <React.Fragment>
                                    <SearchBar
                                        onChange={weapon => {
                                            setBuild(build => ({ ...build, ...weapon }));
                                        }}
                                    />
                                    <IconButton
                                        className={classes.resetBtn}
                                        onClick={handleReset}
                                    >
                                        <Tooltip
                                            title='Reset Build'
                                            enterDelay={1000}
                                        >
                                            <Refresh />
                                        </Tooltip>
                                    </IconButton>
                                </React.Fragment>
                            }
                        />
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
                    <AugmentsInput
                        grid={{
                            xs: 12,
                            sm: 4,
                            md: 12,
                            lg: 6,
                            xl: 4
                        }}
                        value={_.get(build, 'augments')}
                        onChange={augments => {
                            setBuild(build => ({ ...build, augments }));
                        }}
                        className={classes.marginTop}
                    />
                    <SkillsInput
                        grid={{
                            xs: 12,
                            sm: 4,
                            md: 12,
                            lg: 6,
                            xl: 4
                        }}
                        value={_.get(build, 'skills')}
                        onChange={skills => {
                            setBuild(build => ({ ...build, skills }));
                        }}
                        className={classes.marginTop}
                    />
                    <ItemsInput
                        grid={{
                            xs: 12,
                            sm: 4,
                            md: 12,
                            lg: 6
                        }}
                        value={_.get(build, 'items')}
                        onChange={items => {
                            setBuild(build => ({ ...build, items }));
                        }}
                        className={classes.marginTop}
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
