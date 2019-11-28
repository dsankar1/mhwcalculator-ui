import _ from 'lodash';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { makeStyles, Container, Grid, Card, TextField, InputAdornment, Tooltip, Checkbox } from '@material-ui/core';
import { VisibilityOff } from '@material-ui/icons';
import { SubtitleContext } from '../App';
import WeaponTypeSelect from './WeaponTypeSelect';
import SharpnessPicker from './SharpnessPicker';
import AugmentPicker from './AugmentPicker';

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
        marginTop: theme.spacing(0.2),
        padding: theme.spacing(0.5)
    }
}));

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
        sharpness: 'purple'
    });
}

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
                            <WeaponTypeSelect
                                value={_.get(build, 'weapon')}
                                onChange={value => handleChange('weapon', value)}
                            />
                            <Grid container spacing={2} className={classes.weaponAttributeGrid}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label='Raw Damage'
                                        variant='outlined'
                                        type='number'
                                        value={_.get(build, 'raw', '')}
                                        onChange={e => handleChange('raw', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label='Element Damage'
                                        variant='outlined'
                                        type='number'
                                        value={_.get(build, 'element', '')}
                                        onChange={e => handleChange('element', e.target.value)}
                                        InputProps={{
                                            style: {
                                                paddingRight: 8
                                            },
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <Tooltip title={`Hidden: ${_.get(build, 'hiddenElement', false)}`} enterDelay={500}>
                                                        <Checkbox
                                                            size='small'
                                                            color='default'
                                                            checked={_.get(build, 'hiddenElement', false)}
                                                            onChange={() => handleChange('hiddenElement', !_.get(build, 'hiddenElement', false))}
                                                            icon={<VisibilityOff fontSize='small' />}
                                                            checkedIcon={<VisibilityOff fontSize='small' color='primary' />}
                                                        />
                                                    </Tooltip>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label='Affinity'
                                        variant='outlined'
                                        type='number'
                                        value={_.get(build, 'affinity', '')}
                                        onChange={e => handleChange('affinity', e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    %
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <SharpnessPicker
                                        value={_.get(build, 'sharpness')}
                                        onChange={value => handleChange('sharpness', value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <AugmentPicker
                                        label='Attack Augments'
                                        maxLevel={3}
                                        value={_.get(build, 'attackAugments', 0)}
                                        onChange={value => handleChange('attackAugments', value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <AugmentPicker
                                        label='Affinity Augments'
                                        maxLevel={3}
                                        value={_.get(build, 'affinityAugments', 0)}
                                        onChange={value => handleChange('affinityAugments', value)}
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
