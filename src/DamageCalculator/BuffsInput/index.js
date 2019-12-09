import _ from 'lodash';
import React, { memo } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import ButtonPicker from '../ButtonPicker';
import config from './config';

const useStyles = makeStyles({
    container: {
        '-webkit-overflow-scrolling': 'touch'
    }
});

const getValue = (values, options) => {
    return _.defaultTo(_.find(values, value => (
        _.some(options, option => {
            const optionValue = _.get(option, 'value');
            return _.isEqual(value, optionValue);
        })
    )), '');
}

const getChangeHandler = (callback, values, options) => value => {
    let update;
    if (options) {
        const optionValues = _.map(options, option => _.get(option, 'value'));
        update = _.concat(_.difference(values, optionValues), value);
    } else {
        if (_.includes(values, value)) {
            update = _.filter(values, item => !_.isEqual(item, value));
        } else {
            update = _.concat(values, value);
        }
    }
    _.attempt(callback, _.uniq(_.compact(update)));
}

export const BuffsInput = memo(props => {
    const classes = useStyles();

    const gridItems = _.map(config, ({ grid, mutuallyExclusive, minWidth, label, options }, index) => {
        const value = mutuallyExclusive ? getValue(props.buffs, options) : props.buffs;
        const handlerParams = [props.onChange, props.buffs];
        if (mutuallyExclusive) {
            handlerParams.push(options);
        }
        return (
            <Grid key={index} item {...grid}>
                <ButtonPicker
                    minWidth={minWidth}
                    label={label}
                    options={options}
                    value={value}
                    onChange={getChangeHandler(...handlerParams)}
                    mutuallyExclusive={mutuallyExclusive}
                />
            </Grid>
        );  
    });

    return (
        <Grid container spacing={2} className={classes.container}>
            {gridItems}
        </Grid>
    );
});

export default BuffsInput;
