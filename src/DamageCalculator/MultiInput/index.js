import _ from 'lodash';
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Select, FormControlLabel, Checkbox, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import useConfig from './useConfig';

export * from './useConfig';

export const MultiInput = React.memo(props => {
    const theme = useTheme();
    const native = useMediaQuery(theme.breakpoints.down('xs'));
    const [config, configMap] = useConfig(props.config);

    const handleCheckbox = React.useCallback((event, checked) => {
        let update;
        const value = configMap.get(_.get(event, ['target', 'value']));

        if (checked) {
            update = _.concat(props.value, value);
        } else {
            update = _.differenceBy(props.value, [value], 'name');
        }
        _.attempt(props.onChange, update);
    }, [props.onChange]);

    const getSelectHandler = curr => event => {
        const levels = _.get(curr, 'levels');
        const name = _.get(event, ['target', 'value']);
        let update = _.differenceBy(props.value, levels, 'name');

        if (Boolean(name)) {
            const found = _.some(props.value, curr => _.isEqual(_.get(curr, 'name'), name));
            const value = configMap.get(name);

            if (!found) {
                update = _.concat(update, value);
            }
        }
        _.attempt(props.onChange, update);
    }

    const inputEls = _.map(config, (curr, index) => {
        let input;

        if (_.has(curr, 'levels')) {
            let value;

            const levels = _.map(curr.levels, level => {
                const name = _.get(level, 'name');

                if (_.isUndefined(value)) {
                    const found = _.some(props.value, value => (
                        _.isEqual(_.get(value, 'name'), name)
                    ));

                    if (found) {
                        value = name;
                    }
                }

                return native ? (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ) : (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                );
            });

            const name = _.get(curr, 'name');
        
            input = (
                <FormControl fullWidth>
                    <InputLabel>
                        {name}
                    </InputLabel>
                    <Select
                        native={native}
                        value={_.defaultTo(value, '')}
                        onChange={getSelectHandler(curr)}
                    >
                        {native ? (
                            <option value='' />
                        ) : (
                            <MenuItem divider value=''>
                                None
                            </MenuItem>
                        )}
                        {levels}
                    </Select>
                </FormControl>
            );
        } else {
            const name = _.get(curr, 'name');
            const checked = _.some(props.value, value => (
                _.isEqual(_.get(value, 'name'), name)
            ));
            input = (
                <FormControlLabel
                    control={
                        <Checkbox
                            value={name}
                            checked={checked}
                            onChange={handleCheckbox}
                        />
                    }
                    label={name}
                />
            );
        }

        return (
            <Grid key={index} item {...props.grid}>
                {input}
            </Grid>
        );  
    });

    return (
        <Grid container spacing={1}>
            {inputEls}
        </Grid>
    );
});

MultiInput.defaultProps = {
    grid: {
        xs: 12
    },
    value: []
};

export default MultiInput;
