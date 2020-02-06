import _ from 'lodash';
import React from 'react';
import { Grid, TextField, InputAdornment } from '@material-ui/core';
import augments from '../../data/augments';
import weaponTypes, { useStyles as useWeaponTypeStyles, dualBlades, lightBowgun, heavyBowgun, bow } from '../../data/weaponTypes';
import sharpness, { useStyles as useSharpnessStyles } from '../../data/sharpness';
import coatings, { useStyles as useCoatingStyles } from '../../data/coatings';
import ElementInput from '../ElementInput';
import MultiInput from '../MultiInput';
import ButtonSelect from '../ButtonSelect';

export const WeaponInput = React.memo(props => {
    const weaponTypeClasses = useWeaponTypeStyles();

    const sharpnessClasses = useSharpnessStyles();

    const coatingClasses = useCoatingStyles();

    const typeName = _.get(props.value, ['type', 'name']);
    const isBow = _.isEqual(typeName, bow.name);
    const isDualBlades = _.isEqual(typeName, dualBlades.name);
    const isBowgun = _.isEqual(typeName, lightBowgun.name) || _.isEqual(typeName, heavyBowgun.name);

    const handleChange = React.useCallback((name, value) => {
        if (_.isFunction(props.onChange)) {
            _.attempt(props.onChange, _.defaults({
                [name]: value
            }, props.value));
        }
    }, [props.value, props.onChange]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <ButtonSelect
                    isRequired
                    label='Weapon Type'
                    config={weaponTypes}
                    classes={weaponTypeClasses}
                    value={_.get(props.value, 'type')}
                    onChange={type => handleChange('type', type)}
                />
            </Grid>
            <Grid item xs={12} sm={isDualBlades ? 6 : 4} md={isDualBlades ? 3 : 2}>
                <TextField
                    fullWidth
                    type='number'
                    label='Attack'
                    value={_.get(props.value, 'attack', '')}
                    onChange={e => handleChange('attack', e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={isDualBlades ? 6 : 4} md={isDualBlades ? 3 : 2}>
                <TextField
                    fullWidth
                    type='number'
                    label='Affinity'
                    value={_.get(props.value, 'affinity', '')}
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
            {!isBowgun && (
                <Grid item xs={12} sm={isDualBlades ? 6 : 4} md={isDualBlades ? 3 : 2}>
                    <ElementInput
                        label='Element'
                        value={_.get(props.value, 'element')}
                        hidden={_.get(props.value, 'hiddenElement')}
                        onChange={e => handleChange('element', e.target.value)}
                        onHiddenChange={(__, hidden) => handleChange('hiddenElement', hidden)}
                    />
                </Grid>
            )}
            {isDualBlades && (
                <Grid item xs={12} sm={6} md={3}>
                    <ElementInput
                        label='Second Element'
                        value={_.get(props.value, 'secondElement')}
                        hidden={_.get(props.value, 'hiddenSecondElement')}
                        onChange={e => handleChange('secondElement', e.target.value)}
                        onHiddenChange={(__, hidden) => handleChange('hiddenSecondElement', hidden)}
                    />
                </Grid>
            )}
            <Grid item xs={12} md={isDualBlades ? 9 : 6}>
                <MultiInput
                    config={augments}
                    grid={{
                        xs: 12,
                        sm: 4
                    }}
                    value={_.get(props.value, 'augments')}
                    onChange={augments => {
                        handleChange('augments', augments);
                    }}
                />
            </Grid>
            {isBow && (
                <Grid item xs={12} md={6}>
                    <ButtonSelect
                        label='Coating'
                        config={coatings}
                        classes={coatingClasses}
                        value={_.get(props.value, 'coating')}
                        onChange={coating => handleChange('coating', coating)}
                    />
                </Grid>
            )}
            {!isBow && !isBowgun && (
                <Grid item xs={12}>
                    <ButtonSelect
                        isRequired
                        label='Sharpness'
                        config={sharpness}
                        classes={sharpnessClasses}
                        value={_.get(props.value, 'sharpness')}
                        onChange={sharpness => handleChange('sharpness', sharpness)}
                    />
                </Grid>
            )}
        </Grid>
    );
});

export default WeaponInput;
