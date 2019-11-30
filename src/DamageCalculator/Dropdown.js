import _ from 'lodash';
import React, { memo, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

export const Dropdown = memo(({ label, value, options, onChange }) => {
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const menuItems = _.map(options, option => {
        const value = _.get(option, 'value', option);
        const label = _.get(option, 'label', value);
        return (
            <MenuItem key={value} value={value}>
                {label}
            </MenuItem>
        );
    });

    return (
        <FormControl variant='outlined' fullWidth>
            <InputLabel ref={inputLabel}>
                {label}
            </InputLabel>
            <Select
                value={value}
                labelWidth={labelWidth}
                onChange={e => _.attempt(onChange, e.target.value)}
            >
                {menuItems}
            </Select>
        </FormControl>
    );
});

export default Dropdown;
