import _ from 'lodash';
import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
            color: theme.palette.common.black,
            backgroundColor: '#f44336'
        }
    },
    redSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#f44336'
    },
    orange: {
        color: '#d9662c',
        '&:hover': {
            color: theme.palette.common.black,
            backgroundColor: '#d9662c'
        }
    },
    orangeSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#d9662c'
    },
    yellow: {
        color: '#d9d12c',
        '&:hover': {
            color: theme.palette.common.black,
            backgroundColor: '#d9d12c'
        }
    },
    yellowSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#d9d12c'
    },
    green: {
        color: '#70d92c',
        '&:hover': {
            color: theme.palette.common.black,
            backgroundColor: '#70d92c'
        }
    },
    greenSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#70d92c'
    },
    blue: {
        color: '#42a5f5',
        '&:hover': {
            color: theme.palette.common.black,
            backgroundColor: '#42a5f5'
        }
    },
    blueSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#42a5f5'
    },
    white: {
        color: theme.palette.grey[500],
        '&:hover': {
            color: theme.palette.common.black,
            backgroundColor: '#eeeeee'
        }
    },
    whiteSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#eeeeee'
    },
    purple: {
        color: '#cc99ff',
        '&:hover': {
            color: theme.palette.common.black,
            backgroundColor: '#cc99ff'
        }
    },
    purpleSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#cc99ff'
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
            <ButtonGroup size='small' fullWidth className={classes.buttonGroup}>
                {buttons}
            </ButtonGroup>
        </Box>
    );
});

export default SharpnessSelect;
