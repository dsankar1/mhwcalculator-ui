import _ from 'lodash';
import React, { memo, Fragment } from 'react';
import { makeStyles, ButtonGroup, Button, Box, InputLabel } from '@material-ui/core';
import { Check } from '@material-ui/icons';

export const sharpnessOptions = [
    {
        label: 'Red',
        value: 'red',
        backgroundColor: '#f44336'
    },
    {
        label: 'Orange',
        value: 'orange',
        backgroundColor: '#d9662c'
    },
    {
        label: 'Yellow',
        value: 'yellow',
        backgroundColor: '#d9d12c'
    },
    {
        label: 'Green',
        value: 'green',
        backgroundColor: '#66bb6a'
    },
    {
        label: 'Blue',
        value: 'blue',
        backgroundColor: '#42a5f5'
    },
    {
        label: 'White',
        value: 'white',
        backgroundColor: '#eeeeee'
    },
    {
        label: 'Purple',
        value: 'purple',
        backgroundColor: '#b39ddb'
    }
];

const useStyles = makeStyles(theme => ({
    label: {
        marginTop: -theme.spacing(1),
        marginBottom: theme.spacing(0.5)
    },
    button: {
        color: theme.palette.common.black,
        fontSize: 12,
        minWidth: 70,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
}));

export const SharpnessPicker = memo(props => {
    const classes = useStyles();

    const colorButtons = _.map(sharpnessOptions, ({ label, value, ...style }) => {
        const selected = _.isEqual(value, props.value);
        return (
            <Button
                key={value}
                style={style}
                size='small'
                variant='outlined'
                onClick={() => _.attempt(props.onChange, value)}
                className={classes.button}
            >
                {selected && <Check style={{ marginRight: 2, fontSize: 16 }} />} {label}
            </Button>
        );
    });

    return (
        <Fragment>
            <InputLabel shrink className={classes.label}>
                Sharpness
            </InputLabel>
            <Box overflow='auto'>
                <ButtonGroup fullWidth>
                    {colorButtons}
                </ButtonGroup>
            </Box>
        </Fragment>
    );
});

export default SharpnessPicker;
