import _ from 'lodash';
import clsx from 'clsx';
import React, { memo, Fragment } from 'react';
import { darken } from '@material-ui/core/styles';
import { makeStyles, Box, InputLabel, ButtonGroup, Button, Tooltip } from '@material-ui/core';

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
    label: {
        marginBottom: theme.spacing(0.3)
    },
    buttonGroup: {
        display: 'flex'
    },
    button: {
        flex: 1,
        minWidth: 80,
        minHeight: 80,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selected: {
        color: theme.palette.common.black,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: darken(theme.palette.primary.main, 0.2)
        }
    },
    buttonLabel: {
        fontSize: 10,
        fontWeight: 500,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1)
    },
    icon: {
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
                variant='outlined'
                onClick={() => _.attempt(props.onChange, value)}
                className={clsx(classes.button, {
                    [classes.selected]: selected
                })}
            >
                <Tooltip title={label}>
                    <img
                        alt={label}
                        src={process.env.PUBLIC_URL + icon}
                        className={classes.icon}
                    />
                </Tooltip>
            </Button>
        );
    });

    return (
        <Fragment>
            <InputLabel shrink className={classes.label}>
                Weapon Class
            </InputLabel>
            <Box overflow='auto' className={classes.box}>
                <ButtonGroup fullWidth className={classes.buttonGroup}>
                    {weaponTypeButtons}
                </ButtonGroup>
            </Box>
        </Fragment>
    );
});

export default WeaponTypeSelect;
