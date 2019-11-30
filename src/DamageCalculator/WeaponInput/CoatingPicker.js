import _ from 'lodash';
import clsx from 'clsx';
import React, { memo, Fragment } from 'react';
import { darken } from '@material-ui/core/styles';
import { makeStyles, ButtonGroup, Button, Box, InputLabel } from '@material-ui/core';

export const coatingOptions = [
    {
        label: 'None',
        value: ''
    },
    {
        label: 'Paralysis',
        value: 'paralysis'
    },
    {
        label: 'Sleep',
        value: 'sleep'
    },
    {
        label: 'Poison',
        value: 'poison'
    },
    {
        label: 'Blast',
        value: 'blast'
    },
    {
        label: 'Spread',
        value: 'spread'
    },
    {
        label: 'Power',
        value: 'power'
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
    '': {
        color: theme.palette.type === 'light'
            ? darken('#bcaaa4', 0.4) : '#bcaaa4'
    },
    Selected: {
        color: theme.palette.common.black,
        backgroundColor: '#bcaaa4',
        '&:hover': {
            backgroundColor: darken('#bcaaa4', 0.2)
        }
    },
    poison: {
        color: '#d769e4'
    },
    poisonSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#d769e4',
        '&:hover': {
            backgroundColor: darken('#d769e4', 0.2)
        }
    },
    blast: {
        color: theme.palette.type === 'light'
            ? darken('#c3f174', 0.4) : '#c3f174'
    },
    blastSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#c3f174',
        '&:hover': {
            backgroundColor: darken('#c3f174', 0.2)
        }
    },
    sleep: {
        color: theme.palette.type === 'light'
            ? darken('#74d9ed', 0.2) : '#74d9ed'
    },
    sleepSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#74d9ed',
        '&:hover': {
            backgroundColor: darken('#74d9ed', 0.2)
        }
    },
    paralysis: {
        color: theme.palette.type === 'light'
            ? darken('#ffee58', 0.4) : '#ffee58'
    },
    paralysisSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#ffee58',
        '&:hover': {
            backgroundColor: darken('#ffee58', 0.2)
        }
    },
    spread: {
        color: theme.palette.type === 'light'
            ? theme.palette.grey[600] : '#eeeeee'
    },
    spreadSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#eeeeee',
        '&:hover': {
            backgroundColor: darken('#eeeeee', 0.2)
        }
    },
    power: {
        color: theme.palette.type === 'light'
            ? darken('#f85858', 0.2) : '#f85858'
    },
    powerSelected: {
        color: theme.palette.common.black,
        backgroundColor: '#f85858',
        '&:hover': {
            backgroundColor: darken('#f85858', 0.2)
        }
    }
}));

export const CoatingPicker = memo(props => {
    const classes = useStyles();

    const coatingButtons = _.map(coatingOptions, ({ label, value }) => {
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
                Coating
            </InputLabel>
            <Box overflow='auto' className={classes.box}>
                <ButtonGroup fullWidth disabled={props.disabled}>
                    {coatingButtons}
                </ButtonGroup>
            </Box>
        </Fragment>
    );
});

CoatingPicker.defaultProps = {
    value: 'none'
};

export default CoatingPicker;
