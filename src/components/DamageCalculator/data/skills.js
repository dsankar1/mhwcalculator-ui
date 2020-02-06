export default [
    {
        name: "Non-elemental Boost",
        description: "Powers up non-elemental weapons you have equipped.",
        attackPct: 10
    },
    {
        name: "Critical Element",
        description: "Increases elemental damage (fire, water, thunder, ice, dragon) when landing critical hits."
    },
    {
        name: "Affinity Sliding",
        description: "Sliding increases your affinity for a short time.",
        affinity: 30
    },
    {
        name: "Bludgeoner",
        description: "Raises attack as your weapon loses sharpness. Also boosts ranged weapon melee attacks and odds of stunning.",
        "white": 0,
        "blue": 0,
        "green": 0.0789,
        "yellow": 0.1315,
        "orange": 0.1578,
        "red": 0.1578
    },
    {
        name: "Attack Boost",
        description: "Increases attack power. Also improves affinity at higher levels.",
        levels: [
            {
                attack: 3
            },
            {
                attack: 6
            },
            {
                attack: 9
            },
            {
                attack: 12,
                affinity: 5
            },
            {
                attack: 15,
                affinity: 5
            },
            {
                attack: 18,
                affinity: 5
            },
            {
                attack: 21,
                affinity: 5
            }
        ]
    },
    {
        name: "Critical Boost",
        description: "Increases the damage of critical hits.",
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
        name: "Critical Eye",
        description: "Increases affinity.",
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
        name: "Weakness Exploit",
        description: "Increases the affinity of attacks that exploit a monster weak spot.",
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
        name: "Heroics",
        description: "Increases attack power and defense when health drops to 35% or lower.",
        levels: [
            {
                attackPct: 5
            },
            {
                attackPct: 10
            },
            {
                attackPct: 15
            },
            {
                attackPct: 20
            },
            {
                attackPct: 30
            }
        ]
    },
    {
        name: "Agitator",
        description: "Increases attack power and affinity when large monsters become enraged.",
        levels: [
            {
                attack: 4,
                affinity: 3
            },
            {
                attack: 8,
                affinity: 6
            },
            {
                attack: 12,
                affinity: 9
            },
            {
                attack: 16,
                affinity: 12
            },
            {
                attack: 20,
                affinity: 15
            }
        ]
    },
    {
        name: "Element Boost",
        description: "Increases element attack power. (Elemental attack power has a maximum limit.)",
        levels: [
            {
                element: 30
            },
            {
                element: 60
            },
            {
                element: 100
            },
            {
                element: 100,
                elementPct: 5
            },
            {
                element: 100,
                elementPct: 10
            }
        ]
    },
    {
        name: "Fortify",
        description: "Increases your attack and defense every time you fall in battle. (This effect can stack twice.)",
        levels: [
            {
                attackPct: 10
            },
            {
                attackPct: 20
            }
        ]
    },
    {
        name: "Maximum Might",
        description: "Increases affinity when stamina is full.",
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
        name: "Peak Performance",
        description: "Increases attack when your health is full.",
        levels: [
            {
                attack: 5
            },
            {
                attack: 10
            },
            {
                attack: 20
            }
        ]
    },
    {
        name: "Resentment",
        description: "Increases attack when you have recoverable damage (the red portion of your health gauge).",
        levels: [
            {
                attack: 5
            },
            {
                attack: 10
            },
            {
                attack: 15
            },
            {
                attack: 20
            },
            {
                attack: 25
            }
        ]
    },
    {
        name: "Free Element",
        description: "Draws out hidden element.",
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
