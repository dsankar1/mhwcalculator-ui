import _ from 'lodash';
import React, { memo, useCallback } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import ButtonPicker from './ButtonPicker';

const independentBuffs = [
    {
        label: 'Powertalon',
        value: 'powertalon'
    },
    {
        label: 'Powercharm',
        value: 'powercharm'
    },
    {
        label: 'Demon Powder',
        value: 'demonPowder'
    },
    {
        label: 'Palico Horn Attack Up',
        value: 'palicoHornAttackUp'
    }
];

const demonDrugBuffs = [
    {
        label: 'None',
        value: ''
    },
    {
        label: 'Nitroshroom',
        value: 'nitroshroom'
    },
    {
        label: 'Demondrug',
        value: 'demondrug'
    },
    {
        label: 'Mega Demondrug',
        value: 'megaDemondrug'
    }
];

const mightBuffs = [
    {
        label: 'None',
        value: ''
    },
    {
        label: 'Might Seed',
        value: 'mightSeed'
    },
    {
        label: 'Might Pill',
        value: 'mightPill'
    }
];

const mealAttackUp = [
    {
        label: 'None',
        value: ''
    },
    {
        label: 'S',
        value: 'mealAttackUpS'
    },
    {
        label: 'M',
        value: 'mealAttackUpM'
    },
    {
        label: 'L',
        value: 'mealAttackUpL'
    }
];

const huntingHornAttackUp = [
    {
        label: 'None',
        value: ''
    },
    {
        label: 'S',
        value: 'huntingHornAttackUpS'
    },
    {
        label: 'L',
        value: 'huntingHornAttackUpL'
    },
    {
        label: 'XL',
        value: 'huntingHornAttackUpXl'
    }
];

const huntingHornAffinityUp = [
    {
        label: 'None',
        value: ''
    },
    {
        label: 'S',
        value: 'huntingHornAffinityUpS'
    },
    {
        label: 'L',
        value: 'huntingHornAffinityUpL'
    }
];

const huntingHornElementalAttackBoost = [
    {
        label: 'None',
        value: ''
    },
    {
        label: 'S',
        value: 'huntingHornElementalAttackBoostS'
    },
    {
        label: 'L',
        value: 'huntingHornElementalAttackBoostL'
    }
];

const huntingHornStatusAttackBoost = [
    {
        label: 'None',
        value: ''
    },
    {
        label: 'S',
        value: 'huntingHornStatusAttackBoostS'
    },
    {
        label: 'L',
        value: 'huntingHornStatusAttackBoostL'
    }
];

const useStyles = makeStyles(theme => ({
    container: {
        '-webkit-overflow-scrolling': 'touch'
    }
}));

const getValue = (values, options) => {
    return _.defaultTo(_.find(values, value => (
        _.some(options, option => {
            const optionValue = _.get(option, 'value');
            return _.isEqual(value, optionValue);
        })
    )), '');
}

export const BuffsInput = memo(props => {
    const classes = useStyles();

    const onChange = useCallback(update => {
        const cleanedUpdate = _.uniq(_.compact(update));
        _.attempt(props.onChange, cleanedUpdate);
    }, [props.onChange]);

    const getChangeHandler = options => value => {
        const optionValues = _.map(options, option => _.get(option, 'value'));
        const update = _.concat(_.difference(props.buffs, optionValues), value);
        onChange(update);
    }

    const handleChange = value => {
        let update;
        if (_.includes(props.buffs, value)) {
            update = _.filter(props.buffs, buff => !_.isEqual(buff, value));
        } else {
            update = _.concat(props.buffs, value);
        }
        onChange(update);
    }

    return (
        <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12} md={9}>
                <ButtonPicker
                    label='Independent Buffs'
                    options={independentBuffs}
                    value={props.buffs}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <ButtonPicker
                    grouped
                    label='Meal Attack Up'
                    options={mealAttackUp}
                    value={getValue(props.buffs, mealAttackUp)}
                    onChange={getChangeHandler(mealAttackUp)}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <ButtonPicker
                    grouped
                    label='Hunting Horn Attack Up'
                    options={huntingHornAttackUp}
                    value={getValue(props.buffs, huntingHornAttackUp)}
                    onChange={getChangeHandler(huntingHornAttackUp)}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <ButtonPicker
                    grouped
                    label='Hunting Horn Affinity Up'
                    options={huntingHornAffinityUp}
                    value={getValue(props.buffs, huntingHornAffinityUp)}
                    onChange={getChangeHandler(huntingHornAffinityUp)}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <ButtonPicker
                    grouped
                    label='Hunting Horn Elemental Boost'
                    options={huntingHornElementalAttackBoost}
                    value={getValue(props.buffs, huntingHornElementalAttackBoost)}
                    onChange={getChangeHandler(huntingHornElementalAttackBoost)}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <ButtonPicker
                    grouped
                    label='Hunting Horn Status Boost'
                    options={huntingHornStatusAttackBoost}
                    value={getValue(props.buffs, huntingHornStatusAttackBoost)}
                    onChange={getChangeHandler(huntingHornStatusAttackBoost)}
                />
            </Grid>
            <Grid item xs={12} md={5}>
                <ButtonPicker
                    grouped
                    label='Might Buffs'
                    options={mightBuffs}
                    value={getValue(props.buffs, mightBuffs)}
                    onChange={getChangeHandler(mightBuffs)}
                />
            </Grid>
            <Grid item xs={12} md={7}>
                <ButtonPicker
                    grouped
                    label='Demondrug Buffs'
                    options={demonDrugBuffs}
                    value={getValue(props.buffs, demonDrugBuffs)}
                    onChange={getChangeHandler(demonDrugBuffs)}
                    minWidth={120}             
                />
            </Grid>
        </Grid>
    );
});

export default BuffsInput;
