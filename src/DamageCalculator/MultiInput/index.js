import _ from 'lodash';
import React from 'react';
import { Grid, Select, FormControlLabel, Checkbox, MenuItem, FormControl, InputLabel } from '@material-ui/core';

export const createDefaultLabel = (label, index) => `${label} ${index + 1}`;

export const MultiInput = React.memo(props => {
    const configMap = React.useMemo(() => {
        return _.transform(props.config, (acc, config) => {
            if (_.has(config, 'levels')) {
                _.forEach(config.levels, (level, index) => {
                    const defaultLabel = createDefaultLabel(config.label, index);
                    const label = _.defaultTo(_.get(level, 'label'), defaultLabel);
                    acc.set(label, level);
                });
            } else {
                acc.set(_.get(config, 'label'), config);
            }
        }, new Map());
    }, [props.config]);

    const handleCheckbox = React.useCallback((event, checked) => {
        let update;
        const value = configMap.get(_.get(event, ['target', 'value']));

        if (checked) {
            update = _.concat(props.value, value);
        } else {
            update = _.differenceBy(props.value, [value], 'label');
        }
        _.attempt(props.onChange, update);
    }, [props.onChange]);

    const getSelectHandler = config => event => {
        const levels = _.map(config.levels, (level, index) => {
            return _.defaults(level, {
                label: createDefaultLabel(config.label, index)
            });
        });
        let update = _.differenceBy(props.value, levels, 'label');
        const label = _.get(event, ['target', 'value']);

        if (Boolean(label)) {
            const found = _.some(props.value, item => _.isEqual(_.get(item, 'label'), label));
            const value = configMap.get(label);

            if (!found) {
                update = _.concat(update, value);
            }
        }
        _.attempt(props.onChange, update);
    }

    const inputEls = _.map(props.config, (config, index) => {
        let input;

        if (_.has(config, 'levels')) {
            let value;

            const levels = _.map(config.levels, (level, index) => {
                const defaultLabel = createDefaultLabel(config.label, index);
                const label = _.defaultTo(_.get(level, 'label'), defaultLabel);

                if (_.isUndefined(value)) {
                    const found = _.some(props.value, value => _.isEqual(_.get(value, 'label'), label));

                    if (found) {
                        value = label;
                    }
                }
                return (
                    <MenuItem key={label} value={label}>
                        {label}
                    </MenuItem>
                );
            });

            input = (
                <FormControl fullWidth>
                    <InputLabel>
                        {_.get(config, 'label')}
                    </InputLabel>
                    <Select value={_.defaultTo(value, '')} onChange={getSelectHandler(config)}>
                        <MenuItem divider value=''>
                            None
                        </MenuItem>
                        {levels}
                    </Select>
                </FormControl>
            );
        } else {
            const label = _.get(config, 'label');
            const checked = _.some(props.value, value => _.isEqual(_.get(value, 'label'), label));

            input = (
                <FormControlLabel
                    control={
                        <Checkbox
                            name={label}
                            value={label}
                            checked={checked}
                            onChange={handleCheckbox}
                        />
                    }
                    label={label}
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
        <Grid container spacing={2}>
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
