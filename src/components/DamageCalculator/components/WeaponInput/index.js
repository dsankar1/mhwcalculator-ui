import _ from 'lodash';
import React from 'react';
import { Grid, TextField, InputAdornment } from '@material-ui/core';
import { BuildAccessor, WeaponType } from '../../calculator';
import ElementInput from './ElementInput';
import WeaponSelect from './WeaponSelect';
import SharpnessSelect from './SharpnessSelect';

const grid = {
    xs: 12,
    sm: 4,
    md: 12,
    lg: 6,
    xl: 4
};

export const weaponTypeConfig = [
    WeaponType.GREAT_SWORD,
    WeaponType.DUAL_BLADES,
    WeaponType.LONG_SWORD,
    WeaponType.SWORD_AND_SHIELD,
    WeaponType.HAMMER,
    WeaponType.HUNTING_HORN,
    WeaponType.LANCE,
    WeaponType.GUNLANCE,
    WeaponType.SWITCH_AXE,
    WeaponType.CHARGE_BLADE,
    WeaponType.INSECT_GLAIVE,
    WeaponType.LIGHT_BOWGUN,
    WeaponType.HEAVY_BOWGUN,
    WeaponType.BOW
];

export const WeaponInput = React.memo(props => {
    const weaponType = _.get(props.value, BuildAccessor.WEAPON_TYPE);
    const isBow = _.isEqual(weaponType, WeaponType.BOW);
    const isBowgun = _.isEqual(weaponType, WeaponType.LIGHT_BOWGUN) || _.isEqual(weaponType, WeaponType.HEAVY_BOWGUN);

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
            <Grid item xs={12}>
                <WeaponSelect
                    value={_.get(props.value, BuildAccessor.WEAPON_TYPE)}
                    onChange={weaponType => handleChange(BuildAccessor.WEAPON_TYPE, weaponType)}
                />
            </Grid>
            <Grid item {...grid}>
                <TextField
                    fullWidth
                    type='number'
                    label='Attack'
                    title='Attack'
                    value={_.get(props.value, BuildAccessor.ATTACK, '')}
                    onChange={e => handleChange(BuildAccessor.ATTACK, e.target.value)}
                />
            </Grid>
            <Grid item {...grid}>
                <TextField
                    fullWidth
                    type='number'
                    label='Affinity'
                    title='Affinity'
                    value={_.get(props.value, BuildAccessor.AFFINITY_PCT, '')}
                    onChange={e => handleChange(BuildAccessor.AFFINITY_PCT, e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                %
                            </InputAdornment>
                        )
                    }}
                />
            </Grid>
            <Grid item {...grid}>
                <ElementInput
                    fullWidth
                    label='Element'
                    title='Element'
                    value={_.get(props.value, BuildAccessor.ELEMENT)}
                    hidden={Boolean(_.get(props.value, BuildAccessor.HIDDEN_ELEMENT))}
                    onChange={e => handleChange(BuildAccessor.ELEMENT, e.target.value)}
                    onHiddenChange={(__, hiddenElement) => handleChange(BuildAccessor.HIDDEN_ELEMENT, hiddenElement)}
                />
            </Grid>
            {!isBow && !isBowgun && (
                <Grid item xs={12}>
                    <SharpnessSelect
                        value={_.get(props.value, BuildAccessor.SHARPNESS)}
                        onChange={sharpness => handleChange(BuildAccessor.SHARPNESS, sharpness)}
                    />
                </Grid>
            )}
        </Grid>
    );
});

export default WeaponInput;
