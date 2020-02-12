import _ from 'lodash';
import clsx from 'clsx';
import React from 'react';
import { makeStyles, fade, darken } from '@material-ui/core/styles';
import { Box, ButtonGroup, Button } from '@material-ui/core';
import { Sharpness } from '../../calculator';

const useStyles = makeStyles(theme => ({
    box: {
        overflowX: 'auto',
        [theme.breakpoints.down('xs')]: {
            overflowX: 'scroll',
            webkitOverflowScrolling: 'touch'
        }
    },
    buttonGroup: {
        marginTop: theme.spacing(1)
    },
    button: {
        minWidth: '80px'
    },
    red: {
        color: '#f44336',
        '&:hover': {
            backgroundColor: fade('#f44336', 0.3)
        }
    },
    redSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#f44336',
        '&:hover': {
            backgroundColor: darken('#f44336', 0.2)
        }
    },
    orange: {
        color: '#d9662c',
        '&:hover': {
            backgroundColor: fade('#d9662c', 0.3)
        }
    },
    orangeSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#d9662c',
        '&:hover': {
            backgroundColor: darken('#d9662c', 0.2)
        }
    },
    yellow: {
        color: '#d9d12c',
        '&:hover': {
            backgroundColor: fade('#d9d12c', 0.2)
        }
    },
    yellowSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#d9d12c',
        '&:hover': {
            backgroundColor: darken('#d9d12c', 0.2)
        }
    },
    green: {
        color: '#70d92c',
        '&:hover': {
            backgroundColor: fade('#70d92c', 0.3)
        }
    },
    greenSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#70d92c',
        '&:hover': {
            backgroundColor: darken('#70d92c', 0.2)
        }
    },
    blue: {
        color: '#42a5f5',
        '&:hover': {
            backgroundColor: fade('#42a5f5', 0.3)
        }
    },
    blueSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#42a5f5',
        '&:hover': {
            backgroundColor: darken('#42a5f5', 0.2)
        }
    },
    white: {
        color: theme.palette.grey[500],
        '&:hover': {
            backgroundColor: fade('#eeeeee', 0.2)
        }
    },
    whiteSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#eeeeee',
        '&:hover': {
            backgroundColor: darken('#eeeeee', 0.2)
        }
    },
    purple: {
        color: '#cc99ff',
        '&:hover': {
            backgroundColor: fade('#cc99ff', 0.3)
        }
    },
    purpleSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#cc99ff',
        '&:hover': {
            backgroundColor: darken('#cc99ff', 0.2)
        }
    }
}));

const sharpnessList = [
    Sharpness.RED,
    Sharpness.ORANGE,
    Sharpness.YELLOW,
    Sharpness.GREEN,
    Sharpness.BLUE,
    Sharpness.WHITE,
    Sharpness.PURPLE
];

export const SharpnessSelect = React.memo(props => {
    const classes = useStyles();

    const handleChange = sharpness => {
        if (_.isFunction(props.onChange)) {
            props.onChange(sharpness);
        }
    }

    const buttons = _.map(sharpnessList, sharpness => {
        const selected = _.isEqual(props.value, sharpness);
        return (
            <Button
                key={sharpness}
                disableRipple
                disableFocusRipple
                disableTouchRipple
                onClick={() => handleChange(sharpness)}
                className={clsx(classes.button, classes[sharpness], {
                    [classes[sharpness + 'Selected']]: selected
                })}
            >
                {sharpness}
            </Button>
        );
    });

    return (
        <Box className={classes.box}>
            <ButtonGroup
                fullWidth
                size='small'
                className={classes.buttonGroup}
            >
                {buttons}
            </ButtonGroup>
        </Box>
    );
});

export default SharpnessSelect;
