export const SET_CALCULATOR_STATE = "SET_CALCULATOR_STATE";
export const setCalculatorState = data => {
    return { type: SET_CALCULATOR_STATE, data };
}

export const CLEAR_CALCULATOR_STATE = "CLEAR_CALCULATOR_STATE";
export const clearCalculatorState = () => {
    return { type: CLEAR_CALCULATOR_STATE };
}

export const SET_SKILL_LEVEL = "SET_SKILL_LEVEL";
export const setSkillLevel = (name, level) => {
    return { type: SET_SKILL_LEVEL, name, level };
}

export const ADD_SKILL = "ADD_SKILL";
export const addSkill = name => {
    return { type: ADD_SKILL, name };
}

export const REMOVE_SKILL = "REMOVE_SKILL";
export const removeSkill = name => {
    return { type: REMOVE_SKILL, name };
}

export const REMOVE_ALL_SKILLS = "REMOVE_ALL_SKILLS";
export const removeAllSkills = () => {
    return { type: REMOVE_ALL_SKILLS };
}