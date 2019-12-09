export const buffs = [
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

export const demonDrugBuffs = [
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

export const mightBuffs = [
    {
        label: 'Might Seed',
        value: 'mightSeed'
    },
    {
        label: 'Might Pill',
        value: 'mightPill'
    }
];

export const mealAttackUp = [
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

export const huntingHornAttackUp = [
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

export const huntingHornAffinityUp = [
    {
        label: 'S',
        value: 'huntingHornAffinityUpS'
    },
    {
        label: 'L',
        value: 'huntingHornAffinityUpL'
    }
];

export const huntingHornElementalAttackBoost = [
    {
        label: 'S',
        value: 'huntingHornElementalAttackBoostS'
    },
    {
        label: 'L',
        value: 'huntingHornElementalAttackBoostL'
    }
];

export const huntingHornStatusAttackBoost = [
    {
        label: 'S',
        value: 'huntingHornStatusAttackBoostS'
    },
    {
        label: 'L',
        value: 'huntingHornStatusAttackBoostL'
    }
];

export default [
    {
        mutuallyExclusive: false,
        grid: {
            xs: 12
        },
        options: buffs
    },
    {
        mutuallyExclusive: true,
        grid: {
            xs: 12,
            sm: 6,
            md: 3
        },
        label: 'Hunting Horn Attack Up',
        options: huntingHornAttackUp
    },
    {
        mutuallyExclusive: true,
        grid: {
            xs: 12,
            sm: 6,
            md: 3
        },
        label: 'Hunting Horn Affinity Up',
        options: huntingHornAffinityUp
    },
    {
        mutuallyExclusive: true,
        grid: {
            xs: 12,
            sm: 6,
            md: 3
        },
        label: 'Hunting Horn Element Boost',
        options: huntingHornElementalAttackBoost
    },
    {
        mutuallyExclusive: true,
        grid: {
            xs: 12,
            sm: 6,
            md: 3
        },
        label: 'Hunting Horn Status Boost',
        options: huntingHornStatusAttackBoost
    },
    {
        mutuallyExclusive: true,
        grid: {
            xs: 12,
            sm: 6,
            md: 3
        },
        label: 'Meal Attack Up',
        options: mealAttackUp
    },
    {
        mutuallyExclusive: true,
        grid: {
            xs: 12,
            sm: 6,
            md: 3
        },
        label: 'Might Buffs',
        options: mightBuffs
    },
    {
        mutuallyExclusive: true,
        grid: {
            xs: 12,
            md: 6
        },
        minWidth: 120,
        label: 'Demondrug Buffs',
        options: demonDrugBuffs
    }
];