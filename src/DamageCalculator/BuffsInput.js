import _ from 'lodash';
import React, { memo } from 'react';
import { makeStyles, Box, FormControl, FormLabel, FormControlLabel, Checkbox, RadioGroup, Radio, Button, Grid } from '@material-ui/core';

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
    },
    [
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
    ],
    [
        {
            label: 'Might Seed',
            value: 'mightSeed'
        },
        {
            label: 'Might Pill',
            value: 'mightPill'
        }
    ],
    [

    ],
    [

    ]
];

const demonDrugBuffs = [
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
        label: 'Might Seed',
        value: 'mightSeed'
    },
    {
        label: 'Might Pill',
        value: 'mightPill'
    }
];

const mealBuffs = [
    {
        label: 'Meal Attack Up (S)',
        value: 'mealAttackUpS'
    },
    {
        label: 'Meal Attack Up (M)',
        value: 'mealAttackUpM'
    },
    {
        label: 'Meal Attack Up (L)',
        value: 'mealAttackUpL'
    }
];

const huntingHornBuffs = [
    {
        label: 'Hunting Horn Attack Up (S)',
        value: 'huntingHornAttackUpS'
    },
    {
        label: 'Hunting Horn Attack Up (M)',
        value: 'huntingHornAttackUpM'
    },
    {
        label: 'Hunting Horn Attack Up (L)',
        value: 'huntingHornAttackUpL'
    },
    {
        label: 'Hunting Horn Attack Up (XL)',
        value: 'huntingHornAttackUpXl'
    }
];

const useStyles = makeStyles(theme => ({
    container: {
        '-webkit-overflow-scrolling': 'touch'
    },
    topRow: {
        marginBottom: theme.spacing(2)
    },
    formLabel: {
        fontSize: 15,
        whiteSpace: 'nowrap'
    },
    formControlLabel: {
        fontSize: 13,
        whiteSpace: 'nowrap'
    },
    button: {
        width: 110,
        height: 100,
        minWidth: 110,
        minHeight: 100,
        fontSize: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export const CustomRadioGroup = props => {
    const classes = useStyles();

    const radioButtons = _.map(props.options, option => {
        const value = _.get(option, 'value');
        const label = _.get(option, 'label', value);
        return (
            <FormControlLabel
                key={value}
                value={value}
                label={label}
                control={<Radio />}
                classes={{
                    label: classes.formControlLabel
                }}
            />
        );
    });

    return (
        <FormControl>
            {props.label && (
                <FormLabel className={classes.formLabel}>
                    {props.label}
                </FormLabel>
            )}
            <RadioGroup aria-label={props.label}>
                {radioButtons}
            </RadioGroup>
        </FormControl>
    );
}

const LabelledCheckbox = ({ classes, label, value, onChange }) => {
    return (
        <FormControlLabel
            key={label}
            label={label}
            control={
                <Checkbox
                    //checked={checked}
                    //onClick={handleClick}
                />
            }
            classes={{
                label: classes.label
            }}
        />
    );
}

export const BuffsInput = memo(props => {
    const classes = useStyles();

    const generalBuffCheckboxes = _.map(generalBuffs, ({ label, value }) => {
        const checked = _.includes(props.value, value);
        const handleClick = () => {
            let update = _.get(props, 'value', []);
            if (checked) {
                update = _.without(update, value);
            } else {
                update = _.concat(update, value);
            }
            _.attempt(props.onChange, update);
        }
        return (
            <FormControlLabel
                key={label}
                label={label}
                control={
                    <Checkbox
                        checked={checked}
                        onClick={handleClick}
                    />
                }
                classes={{
                    label: classes.label
                }}
            />
        );
    });

    return (
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={12} sm={6} md={4}>
                    <CustomRadioGroup
                        label='Hunting Horn'
                        value={null}
                        options={huntingHornBuffs}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CustomRadioGroup
                        label='Meals'
                        value={null}
                        options={mealBuffs}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CustomRadioGroup
                        label='Demondrugs'
                        value={null}
                        options={demonDrugBuffs}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <CustomRadioGroup
                        label='Might Items'
                        value={null}
                        options={mightBuffs}
                    />
                </Grid>
            </Grid>
    );
});

export default BuffsInput;
