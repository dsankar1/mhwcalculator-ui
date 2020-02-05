import _ from 'lodash';
import clsx from 'clsx';
import React from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles, InputAdornment, TextField, Tooltip, Checkbox, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    divider: {
        height: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    checkbox: {
        padding: theme.spacing(0.5),
        marginRight: theme.spacing(1)
    },
    hidden: {
        opacity: 0.6
    }
}));

export const ElementInput = React.memo(props => {
    const classes = useStyles();

    return (
        <TextField
            fullWidth
            type='number'
            label={props.label}
            defaultValue={props.value}
            onBlur={props.onChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <Divider orientation='vertical' className={classes.divider} />
                        <Tooltip title={`Hidden: ${_.capitalize(Boolean(props.hidden))}`}>
                            <Checkbox
                                size='small'
                                color='default'
                                checked={Boolean(props.hidden)}
                                onChange={props.onHiddenChange}
                                icon={<Visibility fontSize='small' />}
                                checkedIcon={<VisibilityOff fontSize='small' />}
                                className={classes.checkbox}
                            />
                        </Tooltip>
                    </InputAdornment>
                )
            }}
            className={clsx({
                [classes.hidden]: Boolean(props.hidden)
            })}
        />
    );
});

ElementInput.defaultProps = {
    value: '',
    hidden: false
};

export default ElementInput;
