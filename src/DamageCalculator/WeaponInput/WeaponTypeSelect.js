import _ from 'lodash';
import React, { memo } from 'react';
import { makeStyles, Box, Button, FormControlLabel } from '@material-ui/core';

export const weaponTypeOptions = [
    {
        label: 'Great Sword',
        value: 'greatSword',
        icon: '/images/great-sword.png'
    },
    {
        label: 'Dual Blades',
        value: 'dualBlades',
        icon: '/images/dual-blades.png'
    },
    {
        label: 'Long Sword',
        value: 'longSword',
        icon: '/images/long-sword.png'
    },
    {
        label: 'Sword & Shield',
        value: 'swordAndShield',
        icon: '/images/sword-and-shield.png'
    },
    {
        label: 'Hammer',
        value: 'hammer',
        icon: '/images/hammer.png'
    },
    {
        label: 'Hunting Horn',
        value: 'huntingHorn',
        icon: '/images/hunting-horn.png'
    },
    {
        label: 'Lance',
        value: 'lance',
        icon: '/images/lance.png'
    },
    {
        label: 'Gunlance',
        value: 'gunlance',
        icon: '/images/gunlance.png'
    },
    {
        label: 'Switch Axe',
        value: 'switchAxe',
        icon: '/images/switch-axe.png'
    },
    {
        label: 'Charge Blade',
        value: 'chargeBlade',
        icon: '/images/charge-blade.png'
    },
    {
        label: 'Insect Glaive',
        value: 'insectGlaive',
        icon: '/images/insect-glaive.png'
    },
    {
        label: 'Light Bowgun',
        value: 'lightBowgun',
        icon: '/images/light-bowgun.png'
    },
    {
        label: 'Heavy Bowgun',
        value: 'heavyBowgun',
        icon: '/images/heavy-bowgun.png'
    },
    {
        label: 'Bow',
        value: 'bow',
        icon: '/images/bow.png'
    }
];

const useStyles = makeStyles(theme => ({
    box: {
        '-webkit-overflow-scrolling': 'touch'
    },
    topRow: {
        marginBottom: theme.spacing(2)
    },
    weaponTypeButton: {
        width: 110,
        height: 100,
        minWidth: 110,
        minHeight: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    weaponTypeLabel: {
        fontSize: 12,
        fontWeight: 500,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1)
    },
    weaponTypeIcon: {
        width: 40,
        height: 40,
        maxWidth: 40,
        maxHeight: 40
    }
}));

export const WeaponTypeSelect = memo(props => {
    const classes = useStyles();

    const weaponTypeButtons = _.map(weaponTypeOptions, ({ label, value, icon }) => {
        const selected = _.isEqual(value, props.value);
        return (
            <Button
                key={value}
                color={selected ? 'primary' : 'default'}
                variant={selected ? 'contained' : 'outlined'}
                onClick={() => _.attempt(props.onChange, value)}
                className={classes.weaponTypeButton}
            >
                <FormControlLabel
                    label={label}
                    labelPlacement='top'
                    control={
                        <img
                            alt={label}
                            src={process.env.PUBLIC_URL + icon}
                            className={classes.weaponTypeIcon}
                        />
                    }
                    classes={{
                        label: classes.weaponTypeLabel
                    }}
                />
            </Button>
        );
    });

    return (
        <Box overflow='auto' className={classes.box}>
            <Box
                display='flex'
                flexWrap='none'
                justifyContent='space-between'
                className={classes.topRow}
            >
                {_.slice(weaponTypeButtons, 0, 7)}
            </Box>
            <Box
                display='flex'
                flexWrap='none'
                justifyContent='space-between'
            >
                {_.slice(weaponTypeButtons, 7, 14)}
            </Box>
        </Box>
    );
});

export default WeaponTypeSelect;
