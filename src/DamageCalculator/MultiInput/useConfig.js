import _ from 'lodash';
import React from 'react';

export const createDefaultLabel = (name, index) => `${name} ${index + 1}`;

export const formatConfig = config => {
    const formatted = _.sortBy(_.map(_.cloneDeep(config), curr => {
        if (_.has(curr, 'levels')) {
            const levels = _.map(curr.levels, (level, index) => {
                return _.defaults(level, {
                    name: createDefaultLabel(curr.name, index)
                }, _.omit(curr, 'levels'));
            });
            _.set(curr, 'levels', levels);
        }
        return curr;
    }), [curr => Boolean(_.get(curr, 'levels')), 'name']);

    const configMap = _.transform(formatted, (acc, curr) => {
        if (_.has(curr, 'levels')) {
            _.forEach(curr.levels, level => {
                acc.set(_.get(level, 'name'), level);
            });
        } else {
            acc.set(_.get(curr, 'name'), curr);
        }
    }, new Map());

    return [formatted, configMap];
}

export const useConfig = config => {
    return React.useMemo(() => formatConfig(config), [config]);
}

export default useConfig;
