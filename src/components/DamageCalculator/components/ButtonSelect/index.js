import _ from 'lodash';
import clsx from 'clsx';
import React from 'react';
import { darken } from '@material-ui/core/styles';
import { makeStyles, ButtonGroup, Button, Box, FormControl, InputLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(1)
    },
    box: {
        marginTop: theme.spacing(3),
        '-webkit-overflow-scrolling': 'touch'
    },
    selected: {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: darken(theme.palette.primary.main, 0.2)
        }
    }
}));

export const ButtonSelect = React.memo(props => {
    const classes = useStyles(_.omit(props, ['classes']));

    const getChangeHandler = curr => () => {
        if (_.isFunction(props.onChange)) {
            _.attempt(props.onChange, curr);
        }
    }

    const buttonEls = _.map(props.config, curr => {
        const name = _.get(curr, 'name');
        const icon = _.get(curr, 'icon');
        const camelCaseName = _.camelCase(name);
        const selected = _.isEqual(name, _.get(props.value, 'name'));

        return (
            <Button
                key={name}
                disableTouchRipple
                onClick={getChangeHandler(curr)}
                className={clsx(_.get(props.classes, 'button'), _.get(props.classes, camelCaseName), {
                    [_.defaultTo(_.get(props.classes, `${camelCaseName}Selected`), classes.selected)]: selected
                })}
            >
                {Boolean(icon)
                ? (
                    <img
                        src={icon}
                        alt={name}
                        className={_.get(props.classes, 'icon')}
                    />
                ) : name}
            </Button>
        );
    });

    return (
        <FormControl fullWidth className={classes.formControl}>
            <InputLabel shrink>
                {props.label}
            </InputLabel>
            <Box overflow='auto' className={classes.box}>
                <ButtonGroup size='small' variant='outlined' fullWidth>
                    {!props.isRequired && (
                        <Button
                            disableTouchRipple
                            onClick={getChangeHandler(null)}
                            className={clsx(_.get(props.classes, 'button'), _.get(props.classes, 'none'), {
                                [_.defaultTo(_.get(props.classes, 'noneSelected'), classes.selected)]: _.isNil(props.value)
                            })}
                        >
                            None
                        </Button>
                    )}
                    {buttonEls}
                </ButtonGroup>
            </Box>
        </FormControl>
    );
});

export default ButtonSelect;
