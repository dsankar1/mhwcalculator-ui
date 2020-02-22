import _ from 'lodash';
import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ButtonGroup, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check'
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
        color: theme.palette.common.black
    },
    red: {
        backgroundColor: '#f44336',
        '&:hover': {
            backgroundColor: '#f44336',
        }
    },
    redSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#f44336'
    },
    orange: {
        backgroundColor: '#d9662c',
        '&:hover': {
            backgroundColor: '#d9662c',
        }
    },
    orangeSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#d9662c'
    },
    yellow: {
        backgroundColor: '#d9d12c',
        '&:hover': {
            backgroundColor: '#d9d12c',
        }
    },
    yellowSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#d9d12c'
    },
    green: {
        backgroundColor: '#70d92c',
        '&:hover': {
            backgroundColor: '#70d92c',
        }
    },
    greenSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#70d92c'
    },
    blue: {
        backgroundColor: '#42a5f5',
        '&:hover': {
            backgroundColor: '#42a5f5',
        }
    },
    blueSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#42a5f5'
    },
    white: {
        backgroundColor: '#eeeeee',
        '&:hover': {
            backgroundColor: '#eeeeee',
        }
    },
    whiteSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#eeeeee'
    },
    purple: {
        backgroundColor: '#cc99ff',
        '&:hover': {
            backgroundColor: '#cc99ff',
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
                onClick={() => handleChange(sharpness)}
                className={clsx(classes.button, classes[sharpness])}
            >
                {selected && <CheckIcon fontSize='small' />}
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
