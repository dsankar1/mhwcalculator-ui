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
    },
    weaponAttributeGrid: {
        marginTop: theme.spacing(0.5),
        padding: theme.spacing(0.5)
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
                            <Grid container spacing={2} className={classes.weaponAttributeGrid}>
                                <Grid item xs={6} sm={4}>
                                    <TextField
                                        fullWidth
                                        label='Physical'
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid item xs={6} sm={4}>
                                    <TextField
                                        fullWidth
                                        label='Elemental'
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label='Affinity'
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid item xs={8} sm={6}>
                                    <TextField
                                        fullWidth
                                        label='Sharpness'
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                        fullWidth
                                        label='Attack Augments'
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                        fullWidth
                                        label='Affinity Augments'
                                        variant='outlined'
                                    />
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
