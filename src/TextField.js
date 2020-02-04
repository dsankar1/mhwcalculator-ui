import React, { memo } from 'react';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    input: {
        fontSize: 14
    }
}));

export const CustomTextField = memo(props => {
    const classes = useStyles();

    return (
        <TextField
            fullWidth
            variant='outlined'
            inputProps={{
                className: classes.input
            }}
            {...props}
        />
    );
});

export default CustomTextField;

