import _ from 'lodash';
import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ButtonGroup, Button } from '@material-ui/core';
import { WeaponType, iconMap } from '../../calculator';

const useStyles = makeStyles(theme => ({
    box: {
        overflowX: 'auto',
        [theme.breakpoints.down('xs')]: {
            overflowX: 'scroll',
            webkitOverflowScrolling: 'touch'
        }
    },
    buttonGroup: {
        marginBottom: theme.spacing(1)
    },
    button: {
        minHeight: '90px',
        minWidth: '100px',
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    selected: {
        backgroundColor: theme.palette.primary.main
    },
    icon: {
        height: '30px',
        width: '30px',
        minWidth: '30px',
        minHeight: '30px'
    }
}));

const weaponTypeList = [
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

export const WeaponSelect = React.memo(props => {
    const classes = useStyles();

    const handleChange = weaponType => {
        if (_.isFunction(props.onChange)) {
            props.onChange(weaponType);
        }
    }

    const buttons = _.map(weaponTypeList, weaponType => {
        const selected = _.isEqual(props.value, weaponType);
        const label = _.startCase(weaponType);
        const icon = _.get(iconMap, weaponType);

        return (
            <Button
                key={weaponType}
                disableRipple
                disableFocusRipple
                disableTouchRipple
                onClick={() => handleChange(weaponType)}
                className={clsx(classes.button, {
                    [classes.selected]: selected
                })}
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                >
                    <img
                        src={icon}
                        alt={label}
                        className={classes.icon}
                    />
                    {label}
                </Box>
            </Button>
        );
    });

    return (
        <Box className={classes.box}>
            <ButtonGroup size='small' fullWidth className={classes.buttonGroup}>
                {_.take(buttons, 7)}
            </ButtonGroup>
            <ButtonGroup size='small' fullWidth>
                {_.takeRight(buttons, 7)}
            </ButtonGroup>
        </Box>
    );
});

export default WeaponSelect;
