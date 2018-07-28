import clone from "clone";
import { createReducer } from "../constants";
import actions from "../actions";
import { sharpness, weaponTypes, attacks, coatings, skills } from "../constants";

const init = {
    weaponType: weaponTypes[0],
    mv: attacks.find(attack => attack.weapon === weaponTypes[0]).name,
    attack: "",
    affinity: "",
    element: "",
    sharpness: sharpness.blue,
    coating: coatings.none,
    attAug: 0,
    affAug: 0,
    skills: [],
    physicalEffectiveness: "",
    elementEffectiveness: "",
    hiddenElement: false
}

const setCalculatorState = (state, action) => {
    let mv = action.data.weaponType ?
        attacks.find(attack => attack.weapon === action.data.weaponType).name : state.mv;
    return {
        ...clone(state),
        mv,
        ...action.data
    }
}

const clearCalculatorState = (state, action) => {
    return init;
}

const setSkillLevel = (state, action) => {
    let copy = clone(state);
    const i = copy.skills.findIndex(skill => skill.name === action.name);
    if (i !== -1) {
        copy.skills[i].level = action.level; 
    }
    return copy;
}

const addSkill = (state, action) => {
    let copy = clone(state);
    let skill = skills.find(item => item.name.toLowerCase() === action.name.toLowerCase());
    if (skill) {
        copy.skills.push({
            ...skill,
            level: -1
        });
    }
    return copy;
}

const removeSkill = (state, action) => {
    let copy = clone(state);
    copy.skills = copy.skills.filter(skill => skill.name !== action.name);
    return copy;
}

const removeAllSkills = (state, action) => {
    let copy = clone(state);
    copy.skills = [];
    return copy;
}

const handlers = {
    [actions.SET_CALCULATOR_STATE]: setCalculatorState,
    [actions.CLEAR_CALCULATOR_STATE]: clearCalculatorState,
    [actions.SET_SKILL_LEVEL]: setSkillLevel,
    [actions.ADD_SKILL]: addSkill,
    [actions.REMOVE_SKILL]: removeSkill,
    [actions.REMOVE_ALL_SKILLS]: removeAllSkills
}

export default createReducer(init, handlers);
