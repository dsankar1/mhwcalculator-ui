import _ from 'lodash';
import qs from 'qs';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { makeStyles, Container, Grid, Card } from '@material-ui/core';
import { SubtitleContext } from '../App';
import SearchBar from './SearchBar';
import WeaponInput from './WeaponInput';
import SkillsInput from './SkillsInput';
import MultiInput from './MultiInput';
import skills from './data/skills';
import buffs from './data/buffs';

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
        weapon: 'greatSword',
        sharpness: 'purple',
        coating: 'power'
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

    return (
        <Container className={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <SearchBar onChange={handleChange} />
                        <WeaponInput
                            build={build}
                            onChange={handleChange}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                    <Card className={classes.card}>
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
                    </Card>
                </Grid>
                <Grid item xs={12} sm={5} md={4}>
                    <Card className={classes.card}>
                        <MultiInput
                            config={buffs}
                            value={_.get(build, 'buffs')}
                            onChange={buffs => {
                                console.log('Buffs', buffs);
                                handleChange('buffs', buffs);
                            }}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default DamageCalculator;
