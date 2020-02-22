import _ from 'lodash';
import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import { WeaponType, iconMap } from '../../calculator';

const useStyles = makeStyles(theme => ({
    box: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
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
        minHeight: '72px',
        minWidth: '72px',
        margin: theme.spacing(0.5)
    },
    selected: {
        color: `${theme.palette.common.black} !important`,
        backgroundColor: `${theme.palette.primary.main} !important`
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
                variant='outlined'
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
                </Box>
            </Button>
        );
    });

    return (
        <Box className={classes.box}>
            {buttons}
        </Box>
    );
});

export default WeaponSelect;
