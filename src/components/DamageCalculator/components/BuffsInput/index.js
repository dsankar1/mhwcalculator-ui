import _ from 'lodash';
import React from 'react';
import { Card, CardHeader, CardContent, Switch, Divider } from '@material-ui/core';
import MultiInput, { formatConfig } from '../MultiInput';

const selectAll = config => {
    return _.map(formatConfig(config)[0], curr => {
        if (_.has(curr, 'levels')) {
            return _.last(curr.levels);
        } else {
            return curr;
        }
    });
}

export const BuffsInput = React.memo(props => {
    const maxConfig = React.useMemo(() => selectAll(props.config), [props.config]);

    const checked = _.size(props.value) === _.size(props.config);

    const toggleBuffs = (__, checked) => {
        if (_.isFunction(props.onChange)) {
            props.onChange(checked ? maxConfig : []);
        }
    }

    return (
        <Card>
            <CardHeader
                title={props.title}
                action={
                    <Switch
                        checked={checked}
                        onChange={toggleBuffs}
                    />
                }
            />
            <Divider />
            <CardContent>
                <MultiInput {...props} config={props.config} />
            </CardContent>
        </Card>
    );
});

BuffsInput.defaultProps = {
    title: 'Buffs',
    grid: {
        xs: 12
    }
};

export default BuffsInput;
