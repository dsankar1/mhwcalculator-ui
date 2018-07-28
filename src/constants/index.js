export { default as weapons } from "./weapons";
export { default as skills } from "./skills.min";
export { default as attacks } from "./attacks";

export const elementCap = (element, bonus) => {
    let cap = 0;
    if (element < 150) {
        cap = 40;
    } else if (element >= 150 && element < 210) {
        cap = 50;
    } else if (element >= 210 && element < 420) {
        cap = Math.round(element/3) - 10;
    } else if (element >= 420 && element < 480) {
        cap = 130;
    } else if (element >= 480 && element < 540) {
        cap = 140;
    } else {
        cap = 150;
    }
    return Math.min(cap, bonus);
}

export const createReducer = (initialState, actionHandlers) => {
    return function reducer(state = initialState, action) {
        if (actionHandlers.hasOwnProperty(action.type)) {
            return actionHandlers[action.type](state, action)
        } else {
            return state
        }
    }
}

export const coatings = {
    none: "none",
    spread: "spread",
    power: "power"
}

export const coatingModifiers = {
    none: 1,
    spread: 1.25,
    power: 1.3
}

export const weaponTypes = [
    "great-sword",
    "dual-blades",
    "long-sword",
    "sword-and-shield",
    "hammer",
    "hunting-horn",
    "lance",
    "gunlance",
    "switch-axe",
    "charge-blade",
    "insect-glaive",
    "light-bowgun",
    "heavy-bowgun",
    "bow"
]

export const weaponTypeNames = {
    "great-sword": "Greatsword",
    "dual-blades": "Dual Blades",
    "long-sword": "Longsword",
    "sword-and-shield": "Sword & Shield",
    "hammer": "Hammer",
    "hunting-horn": "Hunting Horn",
    "lance": "Lance",
    "gunlance": "Gunlance",
    "switch-axe": "Switch Axe",
    "charge-blade": "Charge Blade",
    "insect-glaive": "Insect Glaive",
    "light-bowgun": "Light Bowgun",
    "heavy-bowgun": "Heavy Bowgun",
    "bow": "Bow"
}

export const weaponTypeModifiers = {
    "great-sword": 4.8,
    "dual-blades": 1.4,
    "long-sword": 3.3,
    "sword-and-shield": 1.4,
    "hammer": 5.2,
    "hunting-horn": 4.2,
    "lance": 2.3,
    "gunlance": 2.3,
    "switch-axe": 3.5,
    "charge-blade": 3.6,
    "insect-glaive": 3.1,
    "light-bowgun": 1.3,
    "heavy-bowgun": 1.5,
    "bow": 1.2
}

export const sharpness = {
    white: "white",
    blue: "blue",
    green: "green",
    yellow: "yellow",
    orange: "orange",
    red: "red"
}

export const sharpnessModifiers = {
    red: {
        physical: .5,
        elemental: .25
    },
    orange: {
        physical: .75,
        elemental: .5
    },
    yellow: {
        physical: 1,
        elemental: .75
    },
    green: {
        physical: 1.05,
        elemental: 1
    },
    blue: {
        physical: 1.2,
        elemental: 1.0625
    },
    white: {
        physical: 1.32,
        elemental: 1.125
    }
}
