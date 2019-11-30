import _ from 'lodash';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { makeStyles, Container, Grid, Card } from '@material-ui/core';
import { SubtitleContext } from '../App';
import WeaponInput from './WeaponInput';

const getInitialBuild = location => {
    // console.log('Location', location);
    let cached = {};
    try {
        const json = localStorage.getItem('build');
        if (_.isString(json)) {
            cached = JSON.parse(json);
        }
    } catch (e) {
        console.error(e);
    }
    return _.defaults(cached, {
        weapon: 'greatSword',
        sharpness: 'purple',
        coating: 'power'
    });
}

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2)
    },
    item: {
        marginBottom: theme.spacing(2),
        '&:last-child': {
            marginBottom: 0
        }
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
                <Grid container item xs={12} md={9}>
                    <Grid item xs={12} className={classes.item}>
                        <Card style={{ height: 100 }}>

                        </Card>
                    </Grid>
                    <Grid item xs={12} className={classes.item}>
                        <Card className={classes.card}>
                            <WeaponInput
                                build={build}
                                onChange={handleChange}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} className={classes.item}>
                        <Card style={{ height: 800 }}>

                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card style={{ height: 300, padding: 16 }}>

                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default DamageCalculator;
