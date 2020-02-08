export default [
    {
        name: 'Non-elemental Boost',
        description: 'Powers up non-elemental weapons you have equipped.',
        attackMult: 1.1
    },
    {
        name: 'Critical Element',
        description: 'Increases elemental damage (fire, water, thunder, ice, dragon) when landing critical hits.',
        criticalElement: true
    },
    {
        name: 'Affinity Sliding',
        description: 'Sliding increases your affinity for a short time.',
        affinity: 1.3
    },
    {
        name: 'Bludgeoner',
        description: 'Raises attack as your weapon loses sharpness. Also boosts ranged weapon melee attacks and odds of stunning.',
        bludgeoner: true,
        attackMult: [
            {
                attribute: 'weapon.sharpness.name',
                operator: '==',
                value: 'red',
                return: 1.1578
            },
            {
                attribute: 'weapon.sharpness.name',
                operator: '==',
                value: 'orange',
                return: 1.1578
            },
            {
                attribute: 'weapon.sharpness.name',
                operator: '==',
                value: 'yellow',
                return: 1.1315
            },
            {
                attribute: 'weapon.sharpness.name',
                operator: '==',
                value: 'green',
                return: 1.0789
            },
            {
                return: 0
            }
        ]
    },
    {
        name: 'Normal Shots',
        levels: [
            {
                attackMult: 1.1
            },
            {
                attackMult: 1.2
            }
        ]
    },
    {
        name: 'Spread/Power Shots',
        levels: [
            {
                attackMult: 1.1
            },
            {
                attackMult: 1.15
            }
        ]
    },
    {
        name: 'Piercing Shots',
        levels: [
            {
                attackMult: 1.1
            },
            {
                attackMult: 1.2
            }
        ]
    },
    {
        name: 'Attack Boost',
        description: 'Increases attack power. Also improves affinity at higher levels.',
        levels: [
            {
                rawAttack: 3
            },
            {
                rawAttack: 6
            },
            {
                rawAttack: 9
            },
            {
                rawAttack: 12,
                affinity: 5
            },
            {
                rawAttack: 15,
                affinity: 5
            },
            {
                rawAttack: 18,
                affinity: 5
            },
            {
                rawAttack: 21,
                affinity: 5
            }
        ]
    },
    {
        name: 'Critical Boost',
        description: 'Increases the damage of critical hits.',
        levels: [
            {
                criticalBoost: 30
            },
            {
                criticalBoost: 35
            },
            {
                criticalBoost: 40
            }
        ]
    },
    {
        name: 'Critical Eye',
        description: 'Increases affinity.',
        levels: [
            {
                affinity: 3
            },
            {
                affinity: 6
            },
            {
                affinity: 10
            },
            {
                affinity: 15
            },
            {
                affinity: 20
            },
            {
                affinity: 25
            },
            {
                affinity: 30
            }
        ]
    },
    {
        name: 'Weakness Exploit',
        description: 'Increases the affinity of attacks that exploit a monster weak spot.',
        levels: [
            {
                affinity: 15
            },
            {
                affinity: 30
            },
            {
                affinity: 50
            }
        ]
    },
    {
        name: 'Heroics',
        description: 'Increases attack power and defense when health drops to 35% or lower.',
        levels: [
            {
                attackMult: 1.05
            },
            {
                attackMult: 1.1
            },
            {
                attackMult: 1.15
            },
            {
                attackMult: 1.2
            },
            {
                attackMult: 1.3
            }
        ]
    },
    {
        name: 'Agitator',
        description: 'Increases attack power and affinity when large monsters become enraged.',
        levels: [
            {
                rawAttack: 4,
                affinity: 3
            },
            {
                rawAttack: 8,
                affinity: 6
            },
            {
                rawAttack: 12,
                affinity: 9
            },
            {
                rawAttack: 16,
                affinity: 12
            },
            {
                rawAttack: 20,
                affinity: 15
            }
        ]
    },
    {
        name: 'Element Boost',
        description: 'Increases element attack power. (Elemental attack power has a maximum limit.)',
        levels: [
            {
                rawElement: 30
            },
            {
                rawElement: 60
            },
            {
                rawElement: 100
            },
            {
                rawElement: 100,
                elementPct: 1.05
            },
            {
                rawElement: 100,
                elementPct: 1.1
            }
        ]
    },
    {
        name: 'Fortify',
        description: 'Increases your attack and defense every time you fall in battle. (This effect can stack twice.)',
        levels: [
            {
                attackMult: 1.1
            },
            {
                attackMult: 1.2
            }
        ]
    },
    {
        name: 'Maximum Might',
        description: 'Increases affinity when stamina is full.',
        levels: [
            {
                affinity: 10
            },
            {
                affinity: 20
            },
            {
                affinity: 30
            }
        ]
    },
    {
        name: 'Peak Performance',
        description: 'Increases attack when your health is full.',
        levels: [
            {
                rawAttack: 5
            },
            {
                rawAttack: 10
            },
            {
                rawAttack: 20
            }
        ]
    },
    {
        name: 'Resentment',
        description: 'Increases attack when you have recoverable damage (the red portion of your health gauge).',
        levels: [
            {
                rawAttack: 5
            },
            {
                rawAttack: 10
            },
            {
                rawAttack: 15
            },
            {
                rawAttack: 20
            },
            {
                rawAttack: 25
            }
        ]
    },
    {
        name: 'Free Element',
        description: 'Draws out hidden element.',
        levels: [
            {
                freeElementPct: 33
            },
            {
                freeElementPct: 66
            },
            {
                freeElementPct: 100
            }
        ]
    }
];
