import _ from 'lodash';
import React, { memo } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import ButtonPicker from './ButtonPicker';

const generalBuffs = [
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

export const BuffsInput = memo(props => {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12}>

            </Grid>
            <Grid item xs={12} md={5}>
                <ButtonPicker
                    label='Might Buffs'
                    options={mightBuffs}                    
                />
            </Grid>
            <Grid item xs={12} md={7}>
                <ButtonPicker
                    label='Demondrug Buffs'
                    options={demonDrugBuffs}
                    minWidth={120}             
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <ButtonPicker
                    label='Meal Attack Up'
                    options={mealAttackUp}                    
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <ButtonPicker
                    label='Hunting Horn Attack Up'
                    options={huntingHornAttackUp}                    
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <ButtonPicker
                    label='Hunting Horn Affinity Up'
                    options={huntingHornAffinityUp}                    
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <ButtonPicker
                    label='Hunting Horn Elemental Attack Boost'
                    options={huntingHornElementalAttackBoost}                    
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <ButtonPicker
                    label='Hunting Horn Status Attack Boost'
                    options={huntingHornStatusAttackBoost}                    
                />
            </Grid>
        </Grid>
    );
});

export default BuffsInput;
