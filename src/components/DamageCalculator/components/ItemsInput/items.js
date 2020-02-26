import { BuffAccessor, WeaponType } from '../../calculator';

export default [
    {
        name: 'Powertalon',
        [BuffAccessor.TRUE_ATTACK]: 9
    },
    {
        name: 'Powercharm',
        [BuffAccessor.TRUE_ATTACK]: 6
    },
    {
        name: 'Demon Powder',
        [BuffAccessor.TRUE_ATTACK]: 10
    },
    {
        name: 'Palico Horn Attack Up',
        [BuffAccessor.ATTACK_MULT]: 1.15
    },
    {
        name: 'Demon Buffs',
        levels: [
            {
                name: 'Nitroshroom',
                [BuffAccessor.TRUE_ATTACK]: 5
            },
            {
                name: 'Demondrug',
                [BuffAccessor.TRUE_ATTACK]: 5
            },
            {
                name: 'Mega Demondrug',
                [BuffAccessor.TRUE_ATTACK]: 7
            }
        ]
    },
    {
        name: 'Might Buffs',
        levels: [
            {
                name: 'Might Seed',
                [BuffAccessor.TRUE_ATTACK]: 10
            },
            {
                name: 'Might Pill',
                [BuffAccessor.TRUE_ATTACK]: 25
            }
        ]
    },
    {
        name: 'Meal Attack Up',
        levels: [
            {
                name: 'Meal Attack Up S',
                [BuffAccessor.TRUE_ATTACK]: 5
            },
            {
                name: 'Meal Attack Up M',
                [BuffAccessor.TRUE_ATTACK]: 10
            },
            {
                name: 'Meal Attack Up L',
                [BuffAccessor.TRUE_ATTACK]: 15
            }
        ]
    },
    {
        name: 'Hunting Horn Attack Up',
        levels: [
            {
                name: 'Hunting Horn Attack Up S',
                [BuffAccessor.ATTACK_MULT]: 1.1
            },
            {
                name: 'Hunting Horn Attack Up L',
                [BuffAccessor.ATTACK_MULT]: 1.15
            },
            {
                name: 'Hunting Horn Attack Up XL',
                [BuffAccessor.ATTACK_MULT]: 1.2
            }
        ]
    },
    {
        name: 'Hunting Horn Affinity Up',
        levels: [
            {
                name: 'Hunting Horn Affinity Up S',
                [BuffAccessor.AFFINITY_PCT]: 15
            },
            {
                name: 'Hunting Horn Affinity Up L',
                [BuffAccessor.AFFINITY_PCT]: 20
            }
        ]
    },
    {
        name: 'Hunting Horn Element Boost',
        levels: [
            {
                name: 'Hunting Horn Element Boost S',
                [BuffAccessor.ELEMENT_MULT]: 1.1
            },
            {
                name: 'Hunting Horn Element Boost L',
                [BuffAccessor.ELEMENT_MULT]: 1.15
            }
        ]
    },
    {
        name: 'Arrow Coating',
        [BuffAccessor.COMBO_DEPENDENT]: true,
        levels: [
            {
                name: 'Close-Range Coating',
                [BuffAccessor.ATTACK_MULT]: [
                    {
                        operator: '&&',
                        group: [
                            {
                                accessor: 'combo.damageType',
                                operator: '==',
                                value: 'projectile'
                            },
                            {
                                accessor: 'build.weaponType',
                                operator: '==',
                                value: WeaponType.BOW
                            }
                        ],
                        return: 1.2
                    },
                    {
                        return: 1
                    }
                ]
            },
            {
                name: 'Power Coating',
                [BuffAccessor.ATTACK_MULT]: [
                    {
                        operator: '&&',
                        group: [
                            {
                                accessor: 'combo.damageType',
                                operator: '==',
                                value: 'projectile'
                            },
                            {
                                accessor: 'build.weaponType',
                                operator: '==',
                                value: WeaponType.BOW
                            }
                        ],
                        return: 1.3
                    },
                    {
                        return: 1
                    }
                ]
            }
        ]
    }
];
