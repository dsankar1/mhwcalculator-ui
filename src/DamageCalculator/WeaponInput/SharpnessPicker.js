import _ from 'lodash';
import clsx from 'clsx';
import React, { memo, Fragment } from 'react';
import { darken } from '@material-ui/core/styles';
import { makeStyles, ButtonGroup, Button, Box, InputLabel } from '@material-ui/core';

export const sharpnessOptions = [
    {
        label: 'Red',
        value: 'red'
    },
    {
        label: 'Orange',
        value: 'orange'
    },
    {
        label: 'Yellow',
        value: 'yellow'
    },
    {
        label: 'Green',
        value: 'green'
    },
    {
        label: 'Blue',
        value: 'blue'
    },
    {
        label: 'White',
        value: 'white'
    },
    {
        label: 'Purple',
        value: 'purple'
    }
];

const useStyles = makeStyles(theme => ({
    box: {
        '-webkit-overflow-scrolling': 'touch'
    },
    label: {
        marginTop: -theme.spacing(0.5),
        marginBottom: theme.spacing(0.5)
    },
    button: {
        color: theme.palette.common.black,
        fontSize: 12,
        minWidth: 70
    },
    red: {
        color: '#f44336'
    },
    redSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#f44336',
        '&:hover': {
            backgroundColor: darken('#f44336', 0.2)
        }
    },
    orange: {
        color: '#d9662c'
    },
    orangeSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#d9662c',
        '&:hover': {
            backgroundColor: darken('#d9662c', 0.2)
        }
    },
    yellow: {
        color: theme.palette.type === 'light'
            ? darken('#d9d12c', 0.2) : '#d9d12c'
    },
    yellowSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#d9d12c',
        '&:hover': {
            backgroundColor: darken('#d9d12c', 0.2)
        }
    },
    green: {
        color: theme.palette.type === 'light'
            ? darken('#70d92c', 0.2) : '#70d92c'
    },
    greenSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#70d92c',
        '&:hover': {
            backgroundColor: darken('#70d92c', 0.2)
        }
    },
    blue: {
        color: '#42a5f5'
    },
    blueSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#42a5f5',
        '&:hover': {
            backgroundColor: darken('#42a5f5', 0.2)
        }
    },
    white: {
        color: theme.palette.type === 'light'
            ? theme.palette.grey[600] : '#eeeeee'
    },
    whiteSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#eeeeee',
        '&:hover': {
            backgroundColor: darken('#eeeeee', 0.2)
        }
    },
    purple: {
        color: theme.palette.type === 'light'
            ? darken('#cc99ff', 0.2) : '#cc99ff'
    },
    purpleSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#cc99ff',
        '&:hover': {
            backgroundColor: darken('#cc99ff', 0.2)
        }
    }
}));

export const SharpnessPicker = memo(props => {
    const classes = useStyles();

    const sharpnessButtons = _.map(sharpnessOptions, ({ label, value }) => {
        const selected = _.isEqual(value, props.value);
        return (
            <Button
                key={value}
                variant='outlined'
                onClick={() => _.attempt(props.onChange, value)}
                className={clsx(classes.button, _.get(classes, value), {
                    [_.get(classes, value + 'Selected')]: selected & !props.disabled
                })}
            >
                {label}
            </Button>
        );
    });

    return (
        <Fragment>
            <InputLabel shrink className={classes.label}>
                Sharpness
            </InputLabel>
            <Box overflow='auto' className={classes.box}>
                <ButtonGroup fullWidth disabled={props.disabled}>
                    {sharpnessButtons}
                </ButtonGroup>
            </Box>
        </Fragment>
    );
});

export default SharpnessPicker;
