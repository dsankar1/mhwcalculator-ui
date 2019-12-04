import _ from 'lodash';
import React, { memo } from 'react';
import { makeStyles, Box, Button } from '@material-ui/core';

const buffOptions = _.sortBy([
    {
        label: 'Might Seed',
        value: 'mightSeed'
    },
    {
        label: 'Might Pill',
        value: 'mightPill'
    },
    {
        label: 'Demon Powder',
        value: 'demonPowder'
    },
    {
        label: 'Demondrug',
        value: 'demondrug'
    },
    {
        label: 'Mega Demondrug',
        value: 'megaDemondrug'
    },
    {
        label: 'Nitroshroom',
        value: 'nitroshroom'
    },
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
    },
    {
        label: 'Hunting Horn Attack Up (XL)',
        value: 'huntingHornAttackUpXl'
    },
    {
        label: 'Palico Horn Attack Up',
        value: 'palicoHornAttackUp'
    },
    {
        label: 'Powertalon',
        value: 'powertalon'
    },
    {
        label: 'Powercharm',
        value: 'powercharm'
    }
], 'label');

const useStyles = makeStyles(theme => ({
    box: {
        '-webkit-overflow-scrolling': 'touch'
    },
    topRow: {
        marginBottom: theme.spacing(2)
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

export const BuffsInput = memo(props => {
    const classes = useStyles();

    const buffButtons = _.map(buffOptions, ({ label, value }) => {
        const selected = _.includes(props.value, value);
        
        const handleClick = () => {
            let update = _.get(props, 'value', []);
            if (selected) {
                update = _.without(update, value);
            } else {
                update = _.concat(update, value);
            }
            _.attempt(props.onChange, update);
        }

        return (
            <Button
                key={value}
                color={selected ? 'primary' : 'default'}
                variant={selected ? 'contained' : 'outlined'}
                onClick={handleClick}
                className={classes.button}
            >
                {label}
            </Button>
        );
    });

    return (
        <Box overflow='auto' className={classes.box}>
            <Box
                display='flex'
                flexWrap='none'
                justifyContent='space-between'
                className={classes.topRow}
            >
                {_.slice(buffButtons, 0, 7)}
            </Box>
            <Box
                display='flex'
                flexWrap='none'
                justifyContent='space-between'
            >
                {_.slice(buffButtons, 7, 13)}
            </Box>
        </Box>
    );
});

export default BuffsInput;
