import _ from 'lodash';
import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { BuildAccessor } from '../../calculator';

export const DefenseInput = React.memo(props => {
    const handleChange = React.useCallback((name, value) => {
        if (_.isFunction(props.onChange)) {
            _.attempt(props.onChange, {
                ...props.value,
                [name]: value
            });
        }
    }, [props.value, props.onChange]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={3} md={6}>
                <TextField
                    fullWidth
                    type='number'
                    label='Sever Multiplier'
                    title='Sever Multiplier'
                    value={_.get(props.value, BuildAccessor.HITZONE_SEVER_MULT, '')}
                    onChange={e => handleChange(BuildAccessor.HITZONE_SEVER_MULT, e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={3} md={6}>
                <TextField
                    fullWidth
                    type='number'
                    label='Blunt Multiplier'
                    title='Blunt Multiplier'
                    value={_.get(props.value, BuildAccessor.HITZONE_BLUNT_MULT, '')}
                    onChange={e => handleChange(BuildAccessor.HITZONE_BLUNT_MULT, e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={3} md={6}>
                <TextField
                    fullWidth
                    type='number'
                    label='Projectile Multiplier'
                    title='Projectile Multiplier'
                    value={_.get(props.value, BuildAccessor.HITZONE_PROJECTILE_MULT, '')}
                    onChange={e => handleChange(BuildAccessor.HITZONE_PROJECTILE_MULT, e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={3} md={6}>
                <TextField
                    fullWidth
                    type='number'
                    label='Elemental Multiplier'
                    title='Elemental Multiplier'
                    value={_.get(props.value, BuildAccessor.HITZONE_ELEMENTAL_MULT, '')}
                    onChange={e => handleChange(BuildAccessor.HITZONE_ELEMENTAL_MULT, e.target.value)}
                />
            </Grid>
        </Grid>
    );
});

export default DefenseInput;
