import _ from 'lodash';
import { BuildAccessor, BuffAccessor, Sharpness } from '../../calculator';

export default [
    {
        name: 'Non-elemental Boost',
        description: 'Powers up non-elemental weapons you have equipped.',
        [BuffAccessor.ATTACK_MULT]: [
            {
                accessor: 'baseTrueFreeElement',
                operator: '==',
                value: 0,
                return: 1.1
            },
            {
                return: 1
            }
        ]
    },
    {
        name: 'Critical Element',
        description: 'Increases elemental damage (fire, water, thunder, ice, dragon) when landing critical hits.',
        [BuffAccessor.CRITICAL_ELEMENT]: true
    },
    {
        name: 'Affinity Sliding',
        description: 'Sliding increases your affinity for a short time.',
        [BuffAccessor.AFFINITY_PCT]: 1.3
    },
    {
        name: 'Bludgeoner',
        description: 'Raises attack as your weapon loses sharpness. Also boosts ranged weapon melee attacks and odds of stunning.',
        // [BuffAccessor.ATTACK_MULT]: build => {
        //     const sharpness = _.get(build, BuildAccessor.SHARPNESS);
        //     switch (sharpness) {
        //         case Sharpness.RED:
        //             return 1.1578;
        //         case Sharpness.ORANGE:
        //             return 1.1578;
        //         case Sharpness.YELLOW:
        //             return 1.1315;
        //         case Sharpness.GREEN:
        //             return 1.0789;
        //         default:
        //             return 1;
        //     }
        // }
    },
    {
        name: 'Normal Shots',
        levels: [
            {
                [BuffAccessor.ATTACK_MULT]: 1.1
            },
            {
                [BuffAccessor.ATTACK_MULT]: 1.2
            }
        ]
    },
    {
        name: 'Spread/Power Shots',
        levels: [
            {
                [BuffAccessor.ATTACK_MULT]: 1.1
            },
            {
                [BuffAccessor.ATTACK_MULT]: 1.15
            }
        ]
    },
    {
        name: 'Piercing Shots',
        levels: [
            {
                [BuffAccessor.ATTACK_MULT]: 1.1
            },
            {
                [BuffAccessor.ATTACK_MULT]: 1.2
            }
        ]
    },
    {
        name: 'Attack Boost',
        description: 'Increases attack power. Also improves affinity at higher levels.',
        levels: [
            {
                [BuffAccessor.TRUE_ATTACK]: 3
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 6
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 9
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 12,
                [BuffAccessor.AFFINITY_PCT]: 5
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 15,
                [BuffAccessor.AFFINITY_PCT]: 5
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 18,
                [BuffAccessor.AFFINITY_PCT]: 5
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 21,
                [BuffAccessor.AFFINITY_PCT]: 5
            }
        ]
    },
    {
        name: 'Critical Boost',
        description: 'Increases the damage of critical hits.',
        levels: [
            {
                [BuffAccessor.CRITICAL_ATTACK_MULT]: 1.3
            },
            {
                [BuffAccessor.CRITICAL_ATTACK_MULT]: 1.35
            },
            {
                [BuffAccessor.CRITICAL_ATTACK_MULT]: 1.4
            }
        ]
    },
    {
        name: 'Critical Eye',
        description: 'Increases affinity.',
        levels: [
            {
                [BuffAccessor.AFFINITY_PCT]: 3
            },
            {
                [BuffAccessor.AFFINITY_PCT]: 6
            },
            {
                [BuffAccessor.AFFINITY_PCT]: 10
            },
            {
                [BuffAccessor.AFFINITY_PCT]: 15
            },
            {
                [BuffAccessor.AFFINITY_PCT]: 20
            },
            {
                [BuffAccessor.AFFINITY_PCT]: 25
            },
            {
                [BuffAccessor.AFFINITY_PCT]: 30
            }
        ]
    },
    {
        name: 'Weakness Exploit',
        description: 'Increases the affinity of attacks that exploit a monster weak spot.',
        levels: [
            {
                [BuffAccessor.AFFINITY_PCT]: 15
            },
            {
                [BuffAccessor.AFFINITY_PCT]: 30
            },
            {
                [BuffAccessor.AFFINITY_PCT]: 50
            }
        ]
    },
    {
        name: 'Heroics',
        description: 'Increases attack power and defense when health drops to 35% or lower.',
        levels: [
            {
                [BuffAccessor.ATTACK_MULT]: 1.05
            },
            {
                [BuffAccessor.ATTACK_MULT]: 1.1
            },
            {
                [BuffAccessor.ATTACK_MULT]: 1.15
            },
            {
                [BuffAccessor.ATTACK_MULT]: 1.2
            },
            {
                [BuffAccessor.ATTACK_MULT]: 1.3
            }
        ]
    },
    {
        name: 'Agitator',
        description: 'Increases attack power and affinity when large monsters become enraged.',
        levels: [
            {
                [BuffAccessor.TRUE_ATTACK]: 4,
                [BuffAccessor.AFFINITY_PCT]: 3
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 8,
                [BuffAccessor.AFFINITY_PCT]: 6
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 12,
                [BuffAccessor.AFFINITY_PCT]: 9
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 16,
                [BuffAccessor.AFFINITY_PCT]: 12
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 20,
                [BuffAccessor.AFFINITY_PCT]: 15
            }
        ]
    },
    {
        name: 'Element Boost',
        description: 'Increases element attack power. (Elemental attack power has a maximum limit.)',
        levels: [
            {
                [BuffAccessor.TRUE_ELEMENT]: 3
            },
            {
                [BuffAccessor.TRUE_ELEMENT]: 6
            },
            {
                [BuffAccessor.TRUE_ELEMENT]: 10
            },
            {
                [BuffAccessor.TRUE_ELEMENT]: 10,
                elementPct: 1.05
            },
            {
                [BuffAccessor.TRUE_ELEMENT]: 10,
                elementPct: 1.1
            }
        ]
    },
    {
        name: 'Fortify',
        description: 'Increases your attack and defense every time you fall in battle. (This effect can stack twice.)',
        levels: [
            {
                [BuffAccessor.ATTACK_MULT]: 1.1
            },
            {
                [BuffAccessor.ATTACK_MULT]: 1.2
            }
        ]
    },
    {
        name: 'Maximum Might',
        description: 'Increases affinity when stamina is full.',
        levels: [
            {
                [BuffAccessor.AFFINITY_PCT]: 10
            },
            {
                [BuffAccessor.AFFINITY_PCT]: 20
            },
            {
                [BuffAccessor.AFFINITY_PCT]: 30
            }
        ]
    },
    {
        name: 'Peak Performance',
        description: 'Increases attack when your health is full.',
        levels: [
            {
                [BuffAccessor.TRUE_ATTACK]: 5
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 10
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 20
            }
        ]
    },
    {
        name: 'Resentment',
        description: 'Increases attack when you have recoverable damage (the red portion of your health gauge).',
        levels: [
            {
                [BuffAccessor.TRUE_ATTACK]: 5
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 10
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 15
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 20
            },
            {
                [BuffAccessor.TRUE_ATTACK]: 25
            }
        ]
    },
    {
        name: 'Free Element',
        description: 'Draws out hidden element.',
        levels: [
            {
                [BuffAccessor.FREE_ELEMENT]: 33
            },
            {
                [BuffAccessor.FREE_ELEMENT]: 66
            },
            {
                [BuffAccessor.FREE_ELEMENT]: 100
            }
        ]
    }
];
