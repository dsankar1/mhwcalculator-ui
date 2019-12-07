import _ from 'lodash';
import clsx from 'clsx';
import React, { Fragment, memo } from 'react';
import { darken } from '@material-ui/core/styles';
import { makeStyles, ButtonGroup, InputLabel, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    label: {
        marginBottom: theme.spacing(0.3)
    },
    button: {
        fontSize: 11
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

    const values = _.defaultTo(props.options, _.range(props.range + 1));

    const augmentButtons = _.map(values, item => {
        const value = _.get(item, 'value', item);
        const label = _.get(item, 'label', value);
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
                {label}
            </Button>
        );
    });

    return (
        <Fragment>
            <InputLabel shrink className={classes.label}>
                {props.label}
            </InputLabel>
            <ButtonGroup fullWidth>
                {augmentButtons}
            </ButtonGroup>
        </Fragment>
    );
});

export default ButtonPicker;
