import _ from 'lodash';
import React, { Fragment, memo } from 'react';
import { makeStyles, ButtonGroup, InputLabel, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    label: {
        marginTop: -theme.spacing(1),
        marginBottom: theme.spacing(0.5)
    },
    button: {
        fontSize: 12
    }
}));

export const AugmentPicker = memo(props => {
    const classes = useStyles();

    const augmentButtons = _.map(_.range(props.maxLevel + 1), value => {
        const selected = _.isEqual(value, props.value);
        return (
            <Button
                key={value}
                size='small'
                color={selected ? 'primary' : 'default'}
                variant={selected ? 'contained' : 'outlined'}
                onClick={() => _.attempt(props.onChange, value)}
                className={classes.button}
            >
                {value}
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

export default AugmentPicker;
