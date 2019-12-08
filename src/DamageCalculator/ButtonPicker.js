import _ from 'lodash';
import clsx from 'clsx';
import React, { memo, Fragment } from 'react';
import { darken } from '@material-ui/core/styles';
import { makeStyles, Box, ButtonGroup, InputLabel, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    label: {
        marginBottom: theme.spacing(0.3)
    },
    button: {
        fontSize: 11,
        whiteSpace: 'nowrap'
    },
    margin: {
        marginRight: theme.spacing(1),
        '&:last-child': {
            marginRight: 0
        }
    },
    selected: {
        color: theme.palette.common.black,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: darken(theme.palette.primary.main, 0.2)
        }
    }
}));

export const ButtonPicker = memo(props => {
    const classes = useStyles();

    let options;
    if (props.options) {
        if (props.mutuallyExclusive) {
            options = _.concat({
                label: 'None',
                value: ''
            }, props.options);
        } else {
            options = props.options;
        }
    } else if (props.range) {
        options = _.range(props.range + 1);
    }

    const buttons = _.map(options, option => {
        const value = _.get(option, 'value', option);
        const label = _.get(option, 'label', value);
        const selected = props.mutuallyExclusive
            ? _.isEqual(props.value, value) : _.includes(props.value, value);
        return (
            <Button
                key={value}
                variant='outlined'
                onClick={() => _.attempt(props.onChange, value)}
                style={{
                    minWidth: props.minWidth
                }}
                className={clsx(classes.button, {
                    [classes.margin]: !props.mutuallyExclusive,
                    [classes.selected]: selected
                })}
            >
                {label}
            </Button>
        );
    });

    return (
        <Fragment>
            <InputLabel shrink className={classes.label}>
                {props.label}
            </InputLabel>
            <Box overflow='auto' whiteSpace='nowrap'>
                {props.mutuallyExclusive ? (
                    <ButtonGroup fullWidth>
                        {buttons}
                    </ButtonGroup>
                ) : buttons}
            </Box>
        </Fragment>
    );
});

export default ButtonPicker;
