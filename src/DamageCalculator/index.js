import _ from 'lodash';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { makeStyles, Container, Grid, Card, TextField } from '@material-ui/core';
import { SubtitleContext } from '../App';
import WeaponTypeSelect from './WeaponTypeSelect.js';

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
    const [build, setBuild] = useState({});

    useEffect(() => {
        setSubtitle('Damage Calculator');
    }, []);

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
                            <WeaponTypeSelect
                                name='weaponType'
                                value={_.get(build, 'weaponType')}
                                onChange={handleChange}
                            />
                            <Grid container spacing={2} style={{ marginTop: 6, padding: 4 }}>
                                <Grid item xs={4}>
                                    <TextField label='Physical' variant='outlined' fullWidth />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField label='Elemental' variant='outlined' fullWidth />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField label='Affinity' variant='outlined' fullWidth />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField variant='outlined' fullWidth />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField variant='outlined' fullWidth />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField variant='outlined' fullWidth />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} className={classes.item}>
                        <Card style={{ height: 800 }}>

                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card style={{ height: 300 }}>

                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default DamageCalculator;
