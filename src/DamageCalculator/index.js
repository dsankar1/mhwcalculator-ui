import _ from 'lodash';
import qs from 'qs';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { makeStyles, Container, Grid, Card, CardHeader, CardContent, Divider, Switch } from '@material-ui/core';
import { SubtitleContext } from '../App';
import SearchBar from './SearchBar';
import WeaponInput from './WeaponInput';
import MultiInput, { formatConfig } from './MultiInput';
import { purple } from './data/sharpness';
import skills from './data/skills';
import buffs from './data/buffs';

const selectAll = config => {
    return _.map(formatConfig(config)[0], curr => {
        if (_.has(curr, 'levels')) {
            return _.last(curr.levels);
        } else {
            return curr;
        }
    });
}

const allSkills = selectAll(skills);

const allBuffs = selectAll(buffs);

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
        weapon: {
            type: 'greatSword',
            sharpness: purple
        }
    });
}

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    card: {
        padding: theme.spacing(2)
    }
}));

export const DamageCalculator = props => {
    const classes = useStyles();
    const setSubtitle = useContext(SubtitleContext);
    const [build, setBuild] = useState(getInitialBuild(props.location));

    useEffect(() => {
        setSubtitle('Damage Calculator');
    }, []);

    useEffect(() => {
        localStorage.setItem('build', JSON.stringify(build));
    }, [build]);

    const handleChange = useCallback((name, value) => {
        setBuild(build => ({
            ...build,
            [name]: value
        }));
    }, [setBuild]);

    const toggleSkills = useCallback((__, checked) => {
        setBuild(build => ({
            ...build,
            skills: checked ? allSkills : []
        }));
    }, [setBuild]);

    const toggleBuffs = useCallback((__, checked) => {
        setBuild(build => ({
            ...build,
            buffs: checked ? allBuffs : []
        }));
    }, [setBuild]);

    console.log('Build', build);

    return (
        <Container className={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title='Weapon' />
                        <Divider />
                        <CardContent>
                            {/* <SearchBar onChange={handleChange} /> */}
                            <WeaponInput
                                value={_.get(build, 'weapon')}
                                onChange={weapon => {
                                    handleChange('weapon', weapon);
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                    <Card>
                        <CardHeader
                            title='Skills'
                            action={
                                <Switch
                                    checked={_.size(build.skills) === _.size(skills)}
                                    onChange={toggleSkills}
                                />
                            }
                        />
                        <Divider />
                        <CardContent>
                            <MultiInput
                                config={skills}
                                grid={{
                                    xs: 12,
                                    sm: 6
                                }}
                                value={_.get(build, 'skills')}
                                onChange={skills => {
                                    handleChange('skills', skills);
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={5} md={4}>
                    <Card>
                        <CardHeader
                            title='Buffs'
                            action={
                                <Switch
                                    checked={_.size(build.buffs) === _.size(buffs)}
                                    onChange={toggleBuffs}
                                />
                            }
                        />
                        <Divider />
                        <CardContent>
                            <MultiInput
                                config={buffs}
                                value={_.get(build, 'buffs')}
                                onChange={buffs => {
                                    handleChange('buffs', buffs);
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default DamageCalculator;
