import _ from 'lodash';
import React from 'react';
import { makeStyles, Grid, TextField, InputAdornment } from '@material-ui/core';
import augments from '../../data/augments';
// import WeaponType from '../../data/weaponTypes';
import { sharpnessList as sharpness, useStyles as useSharpnessStyles } from '../../data/sharpness';
import coatings, { useStyles as useCoatingStyles } from '../../data/coatings';
import ElementInput from '../ElementInput';
import MultiInput from '../MultiInput';
import ButtonSelect from '../ButtonSelect';
import { BuildAccessor, WeaponType } from '../../calculator';
import SharpnessSelect from './SharpnessSelect';

export const useWeaponTypeStyles = makeStyles(theme => ({
    button: {
        flex: 1,
        minWidth: '80px',
        minHeight: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: '40px',
        height: '40px',
        maxWidth: '40px',
        maxHeight: '40px'
    }
}));

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
    const weaponTypeClasses = useWeaponTypeStyles();

    const sharpnessClasses = useSharpnessStyles();

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
                <ButtonSelect
                    isRequired
                    label='Weapon Type'
                    config={weaponTypeConfig}
                    classes={weaponTypeClasses}
                    value={_.get(props.value, BuildAccessor.WEAPON_TYPE)}
                    onChange={weaponType => handleChange(BuildAccessor.WEAPON_TYPE, weaponType)}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    type='number'
                    label='Attack'
                    title='Attack'
                    value={_.get(props.value, BuildAccessor.ATTACK, '')}
                    onChange={e => handleChange(BuildAccessor.ATTACK, e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
                <ElementInput
                    fullWidth
                    label='Element'
                    disabled={isBowgun}
                    title={isBowgun ? 'Element isn\'t available on bowguns' : 'Element'}
                    value={isBowgun ? '' : _.get(props.value, BuildAccessor.ELEMENT)}
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
