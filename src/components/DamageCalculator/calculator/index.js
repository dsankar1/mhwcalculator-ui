import _ from 'lodash';
import { attackBloatMap, criticalElementMultMap } from './weaponType';
import { attackMultMap, elementMultMap } from './sharpness';

export const exampleBuild = {
    weapon: {
        type: 'bow',
        sharpness: 'blue',
        attack: 1000,
        affinity: 10,
        elements: [],
        statuses: [],
        augments: []
    },
    combo: [],
    skills: [],
    items: []
};

export const BuildAccessor = {
    WEAPON_TYPE: 'weapon.type',
    SHARPNESS: 'weapon.sharpness',
    ATTACK: 'weapon.attack',
    AFFINITY: 'weapon.affinity',
    ELEMENTS: 'weapon.elements',
    STATUSES: 'weapon.statuses',
    AUGMENTS: 'weapon.augments',
    COMBO: 'combo',
    SKILLS: 'skills',
    ITEMS: 'items'
};

export const BuffAccessor = {
    TRUE_ATTACK: 'trueAttack',
    ATTACK_MULT: 'attackMult',
    AFFINITY: 'affinity',
    TRUE_ELEMENT: 'trueElement',
    ELEMENT_MULT: 'elementMult',
    FREE_ELEMENT: 'freeElement',
    CRITICAL_ELEMENT: 'criticalElement',
    CRITICAL_ATTACK_MULT: 'criticalAttackMult'
};

export const calculateDamage = build => {
    const baseAffinity = +_.get(build, BuildAccessor.AFFINITY, 0);
    const weaponType = _.get(build, BuildAccessor.WEAPON_TYPE);
    const attackBloat = _.get(attackBloatMap, weaponType);
    const baseTrueAttack = +_.get(build, BuildAccessor.ATTACK, 0) / attackBloat;
    const baseTrueElement = +_.get(build, `${BuildAccessor.ELEMENTS}[0]`, 0) / 10;

    const aggregateBuffs = createAggregateBuffs(baseTrueAttack, baseTrueElement);
    const augments = _.get(build, BuildAccessor.AUGMENTS, []);
    const skills = _.get(build, BuildAccessor.SKILLS, []);
    const items = _.get(build, BuildAccessor.ITEMS, []);
    const buffs = aggregateBuffs(_.concat(augments, skills, items));
    
    const trueAttack = Math.round(baseTrueAttack + buffs.trueAttack);
    const trueElement = Math.round((baseTrueElement + buffs.trueElement) * buffs.freeElement);

    const sharpness = _.get(build, BuildAccessor.SHARPNESS);
    const sharpnessAttackMult = _.get(attackMultMap, sharpness);
    const sharpnessElementMult = _.get(elementMultMap, sharpness);

    const affinity = baseAffinity + buffs.affinity;
    const clampedAffinity = _.clamp(affinity, -100, 100);
    const criticalAttackMult = affinity > 0 ? _.get(buffs, BuffAccessor.CRITICAL_ATTACK_MULT, 1.25) : 0.75;
    const criticalElementMult = buffs.criticalElement ? _.get(criticalElementMultMap, weaponType) : 1;

    return {
        affinity,
        trueAttack,
        trueElement,
        sharpnessAttackMult,
        sharpnessElementMult,
        criticalAttackMult,
        criticalElementMult
    };
}

export const getTrueElementCap = baseTrueElement => {
    if (baseTrueElement <= 12) {
        return 4;
    } else if (baseTrueElement <= 18) {
        return 5;
    } else if (baseTrueElement <= 21) {
        return 6;
    } else if (baseTrueElement <= 24) {
        return 7;
    } else if (baseTrueElement <= 27) {
        return 8;
    } else if (baseTrueElement <= 30) {
        return 9;
    } else if (baseTrueElement <= 33) {
        return 10;
    } else if (baseTrueElement <= 36) {
        return 11;
    } else if (baseTrueElement <= 39) {
        return 12;
    } else if (baseTrueElement <= 45) {
        return 13;
    } else if (baseTrueElement <= 48) {
        return 14;
    } else {
        return 15;
    }
}

export const createAggregateBuffs = (baseTrueAttack, baseTrueElement) => buffs => {
    let totalAffinity = 0;
    let totalTrueAttack = 0
    let totalTrueElement = 0;
    let totalFreeElement = 0;
    let netCriticalElement = false;
    let criticalAttackMult = 1.25;

    _.forEach(buffs, buff => {
        let trueAttack = +_.get(buff, BuffAccessor.TRUE_ATTACK, 0);
        const attackMult = +_.get(buff, BuffAccessor.ATTACK_MULT, 0);
        trueAttack = (attackMult * baseTrueAttack) - baseTrueAttack + trueAttack;
        totalTrueAttack += trueAttack;

        let trueElement = +_.get(buff, BuffAccessor.TRUE_ELEMENT, 0);
        const elementMult = +_.get(buff, BuffAccessor.ELEMENT_MULT, 0);
        trueElement = (elementMult * baseTrueElement) - baseTrueElement + trueElement;
        totalTrueElement += trueElement;

        totalAffinity += +_.get(buff, BuffAccessor.AFFINITY, 0);

        const freeElement = +_.get(buff, BuffAccessor.FREE_ELEMENT, 0);
        totalFreeElement = Math.min(totalFreeElement + freeElement, 1);

        const criticalElement = _.get(buff, BuffAccessor.CRITICAL_ELEMENT, false);
        netCriticalElement = netCriticalElement || criticalElement;

        criticalAttackMult = Math.max(criticalAttackMult, +_.get(buff, BuffAccessor.CRITICAL_ATTACK_MULT, 0));
    });

    const trueElementCap = getTrueElementCap(baseTrueElement);    
    totalTrueElement = Math.min(totalTrueElement, trueElementCap);

    return {
        [BuffAccessor.AFFINITY]: totalAffinity,
        [BuffAccessor.TRUE_ATTACK]: totalTrueAttack,
        [BuffAccessor.TRUE_ELEMENT]: totalTrueElement,
        [BuffAccessor.FREE_ELEMENT]: totalFreeElement,
        [BuffAccessor.CRITICAL_ELEMENT]: netCriticalElement,
        [BuffAccessor.CRITICAL_ATTACK_MULT]: criticalAttackMult
    };
}
