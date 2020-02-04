export const skills = [
    {
        "name": "Attack Boost",
        "description": "Increases attack power. Also improves affinity at higher levels.",
        "levels": [
            {
                "attack": 3
            },
            {
                "attack": 6
            },
            {
                "attack": 9
            },
            {
                "attack": 12,
                "affinity": 5
            },
            {
                "attack": 15,
                "affinity": 5
            },
            {
                "attack": 18,
                "affinity": 5
            },
            {
                "attack": 21,
                "affinity": 5
            }
        ]
    },
    {
        "name": "Critical Boost",
        "description": "Increases the damage of critical hits.",
        "levels": [
            {
                "affinity-boost": 30
            },
            {
                "affinity-boost": 35
            },
            {
                "affinity-boost": 40
            }
        ]
    },
    {
        "name": "Critical Eye",
        "description": "Increases affinity.",
        "levels": [
            {
                "affinity": 3
            },
            {
                "affinity": 6
            },
            {
                "affinity": 10
            },
            {
                "affinity": 15
            },
            {
                "affinity": 20
            },
            {
                "affinity": 25
            },
            {
                "affinity": 30
            }
        ]
    },
    {
        "name": "Weakness Exploit",
        "description": "Increases the affinity of attacks that exploit a monster weak spot.",
        "levels": [
            {
                "affinity": 15
            },
            {
                "affinity": 30
            },
            {
                "affinity": 50
            }
        ]
    },
    {
        "name": "Heroics",
        "description": "Increases attack power and defense when health drops to 35% or lower.",
        "levels": [
            {
                "attack-percent": 0.05
            },
            {
                "attack-percent": 0.10
            },
            {
                "attack-percent": 0.15
            },
            {
                "attack-percent": 0.20
            },
            {
                "attack-percent": 0.30
            }
        ]
    },
    {
        "name": "Agitator",
        "description": "Increases attack power and affinity when large monsters become enraged.",
        "levels": [
            {
                "attack": 4,
                "affinity": 3
            },
            {
                "attack": 8,
                "affinity": 6
            },
            {
                "attack": 12,
                "affinity": 9
            },
            {
                "attack": 16,
                "affinity": 12
            },
            {
                "attack": 20,
                "affinity": 15
            }
        ]
    },
    {
        "name": "Affinity Sliding",
        "description": "Sliding increases your affinity for a short time.",
        "levels": [
            {
                "affinity": 30
            }
        ]
    },
    {
        "name": "Element Boost",
        "description": "Increases element attack power. (Elemental attack power has a maximum limit.)",
        "levels": [
            {
                "element": 30
            },
            {
                "element": 60
            },
            {
                "element": 100
            },
            {
                "element": 100,
                "element-percent": 0.05
            },
            {
                "element": 100,
                "element-percent": 0.10
            }
        ]
    },
    {
        "name": "Fortify",
        "description": "Increases your attack and defense every time you fall in battle. (This effect can stack twice.)",
        "levels": [
            {
                "attack-percent": 0.10
            },
            {
                "attack-percent": 0.20
            }
        ]
    },
    {
        "name": "Maximum Might",
        "description": "Increases affinity when stamina is full.",
        "levels": [
            {
                "affinity": 10
            },
            {
                "affinity": 20
            },
            {
                "affinity": 30
            }
        ]
    },
    {
        "name": "Non-elemental Boost",
        "description": "Powers up non-elemental weapons you have equipped.",
        "levels": [
            {
                "attack-percent": 0.10
            }
        ]
    },
    {
        "name": "Peak Performance",
        "description": "Increases attack when your health is full.",
        "levels": [
            {
                "attack": 5
            },
            {
                "attack": 10
            },
            {
                "attack": 20
            }
        ]
    },
    {
        "name": "Bludgeoner",
        "description": "Raises attack as your weapon loses sharpness. Also boosts ranged weapon melee attacks and odds of stunning.",
        "levels": [
            {
                "white": 0,
                "blue": 0,
                "green": 0.0789,
                "yellow": 0.1315,
                "orange": 0.1578,
                "red": 0.1578
            }
        ]
    },
    {
        "name": "Resentment",
        "description": "Increases attack when you have recoverable damage (the red portion of your health gauge).",
        "levels": [
            {
                "attack": 5
            },
            {
                "attack": 10
            },
            {
                "attack": 15
            },
            {
                "attack": 20
            },
            {
                "attack": 25
            }
        ]
    },
    {
        "name": "Critical Element",
        "description": "Increases elemental damage (fire, water, thunder, ice, dragon) when landing critical hits.",
        "levels": []
    },
    {
        "name": "Free Element",
        "description": "Draws out hidden element.",
        "levels": [
            {
                "unlock-element": 0.33
            },
            {
                "unlock-element": 0.66
            },
            {
                "unlock-element": 1.0
            }
        ]
    }
];

export default skills;