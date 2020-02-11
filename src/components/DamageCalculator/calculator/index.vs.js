import _ from 'lodash';
import { attackBloatMap, criticalElementMultMap, combosMap } from './weaponType';
import { attackMultMap, elementMultMap } from './sharpness';

export * from './weaponType';
export * from './sharpness';
export * from './attacks';

export const evaluateCondition = (condition, data) => {
    const accessor = _.get(condition, 'accessor');
    const target = _.get(data, accessor);
    const operator = _.toLower(_.get(condition, 'operator'));
    const value = _.get(condition, 'value');
    const group = _.map(_.get(condition, 'group'), condition => {
        return evaluateCondition(condition, data);
    });

    switch(operator) {
        case '==':
            return _.isEqual(target, value);
        case '!=':
            return !_.isEqual(target, value);
        case '>':
            return _.gt(target, value);
        case '>=':
            return _.gte(target, value);
        case '<':
            return _.lt(target, value);
        case '<=':
            return _.lte(target, value);
        case 'and':
            return _.every(group, Boolean);
        case 'or':
            return _.some(group, Boolean);
        default:
            return true;
    }
}

export const resolveCondition = (conditions, data, defaultResult) => {
    let result = defaultResult;

    _.forEach(conditions, condition => {
        if (evaluateCondition(condition, data)) {
            result = _.get(condition, 'return');
            return false;
        }
    });
    return result;
}

// Resolves the bonuses of build dependent buffs
export const getBuffResolver = data => unresolvedBuffs => {
    return _.map(unresolvedBuffs, unresolvedBuff => {
        return _.transform(unresolvedBuff, (resolvedBuff, value, key) => {
            if (!_.isArray(value)) {
                _.set(resolvedBuff, key, value);
            } else {
                const resolvedValue = resolveCondition(value, data);
                _.set(resolvedBuff, key, resolvedValue);
            }
        }, {});
    });
}

export const BuildAccessor = {
    WEAPON_TYPE: 'weaponType',
    ATTACK: 'attack',
    ELEMENT: 'element',
    HIDDEN_ELEMENT: 'hiddenElement',
    AFFINITY_PCT: 'affinityPct',
    SHARPNESS: 'sharpness',
    BUFFS: 'buffs'
};

export const BuffAccessor = {
    COMBO_DEPENDENT: 'comboDependent',
    ATTACK: 'attack',
    TRUE_ATTACK: 'trueAttack',
    ATTACK_MULT: 'attackMult',
    ELEMENT: 'element',
    TRUE_ELEMENT: 'trueElement',
    ELEMENT_MULT: 'elementMult',
    AFFINITY_PCT: 'affinityPct',
    FREE_ELEMENT: 'freeElement',
    CRITICAL_ELEMENT: 'criticalElement',
    CRITICAL_ATTACK_MULT: 'criticalAttackMult'
};

export const calculateDamage = build => {
    const weaponType = _.get(build, BuildAccessor.WEAPON_TYPE);
    const weaponBloat = _.get(attackBloatMap, weaponType);
    const baseTrueAttack = +_.get(build, BuildAccessor.ATTACK, 0) / weaponBloat;

    const hiddenElement = Boolean(_.get(build, BuildAccessor.HIDDEN_ELEMENT));
    const baseTrueElement = +_.get(build, BuildAccessor.ELEMENT, 0) / 10;

    const unresolvedBuffs = _.get(build, BuildAccessor.BUFFS);
    const unresolvedGeneralBuffs = _.filter(unresolvedBuffs, [BuffAccessor.COMBO_DEPENDENT, false]);
    const unresolvedComboBuffs = _.filter(unresolvedBuffs, BuffAccessor.COMBO_DEPENDENT);

    const baseAffinityPct = +_.get(build, BuildAccessor.AFFINITY_PCT, 0);
    const affinityPctBoost = _.flow(_.map, _.compact, _.sum)(unresolvedGeneralBuffs, BuffAccessor.AFFINITY_PCT);
    const affinityPct = _.clamp(baseAffinityPct + affinityPctBoost, -100, 100);

    const criticalAttackMult = _.defaultTo(_.flow(_.map, _.max)(unresolvedGeneralBuffs, BuffAccessor.CRITICAL_ATTACK_MULT), 1.25);
    const criticalElementMult = _.get(criticalElementMultMap, weaponType);
    const affinityAttackMult = calculateAffinityDamageMult(affinityPct, criticalAttackMult);
    const criticalElement = _.some(unresolvedGeneralBuffs, BuffAccessor.CRITICAL_ELEMENT);
    const affinityElementMult = criticalElement ? calculateAffinityDamageMult(affinityPct, criticalElementMult) : 1;

    const freeElement = Math.min(_.flow(_.map, _.compact, _.sum)(unresolvedGeneralBuffs, BuffAccessor.FREE_ELEMENT), 100);
    const baseTrueFreeElement = baseTrueElement * (hiddenElement ? (freeElement / 100) : 1);

    const sharpness = _.get(build, BuildAccessor.SHARPNESS);
    const sharpnessAttackMult = _.get(attackMultMap, sharpness);
    const sharpnessElementMult = _.get(elementMultMap, sharpness);

    const resolverData = {
        build,
        weaponBloat,
        baseTrueAttack,
        baseTrueElement,
        freeElement,
        baseTrueFreeElement,
        baseAffinityPct,
        affinityPctBoost,
        affinityPct,
        criticalAttackMult,
        criticalElement,
        criticalElementMult,
        affinityAttackMult,
        affinityElementMult,
        sharpnessAttackMult,
        sharpnessElementMult
    };
    const generalBuffResolver = getBuffResolver(resolverData);
    const buffAggregator = getBuffAggregator(baseTrueAttack, baseTrueFreeElement);
    const [generalBuffs, generalBuffList] = _.flow(generalBuffResolver, buffAggregator)(unresolvedGeneralBuffs);

    const trueAttack = baseTrueAttack + _.get(generalBuffs, BuffAccessor.TRUE_ATTACK);
    const trueElementBoostCap = getTrueElementBoostCap(baseTrueElement);    
    const trueElementBoost = Math.min(_.get(generalBuffs, BuffAccessor.TRUE_ELEMENT), trueElementBoostCap);
    const trueElement = baseTrueFreeElement + trueElementBoost;

    const combos = _.map(_.get(combosMap, weaponType), combo => {
        const comboBuffResolver = getBuffResolver(_.defaults(resolverData, { combo }));
        const [comboBuffs, comboBuffList] = _.flow(comboBuffResolver, buffAggregator)(unresolvedComboBuffs);

        let physical = Math.round(trueAttack + _.get(comboBuffs, BuffAccessor.TRUE_ATTACK));
        let elemental = Math.round(trueElement + _.get(comboBuffs, BuffAccessor.TRUE_ELEMENT));

        if (!combo.ignoreAffinity) {
            physical *= sharpnessAttackMult;
            elemental *= sharpnessElementMult;
        }

        if (!combo.ignoreSharpness) {
            physical *= affinityAttackMult;
            elemental *= affinityElementMult;
        }

        elemental = Math.floor(elemental);

        const damageValues = _.map(combo.motionValues, motionValue => {
            const motionValuePhysical = Math.floor(physical * (motionValue / 100));
            return {
                elemental,
                physical: motionValuePhysical,
                total: motionValuePhysical + elemental
            }
        });

        return _.defaults(combo, {
            damageValues,
            buffs: comboBuffs,
            buffList: comboBuffList
        });
    });

    return _.defaults({
        combos,
        buffs: generalBuffs,
        buffList: generalBuffList,
        attack: Math.round(trueAttack * weaponBloat),
        element: Math.round(trueElement * 10),
        trueAttack: Math.round(trueAttack),
        trueElement: Math.round(trueElement)
    }, resolverData);
}

export const calculateAffinityDamageMult = (affinityPct, criticalMult) => {
    if (affinityPct === 0) {
        return 1;
    }

    const affinity = _.clamp(affinityPct, -100, 100) / 100;
    return 1 + affinity * (criticalMult - 1);
}

export const getTrueElementBoostCap = baseTrueElement => {
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

export const createBuffFuncCaller = (...params) => buffs => {
    return _.map(buffs, buff => {
        return _.transform(buff, (acc, value, key) => {
            if (_.isFunction(value)) {
                _.set(acc, key, value(...params));
            } else {
                _.set(acc, key, value);
            }
        }, {});
    });
}

export const getBuffAggregator = (baseTrueAttack, baseTrueElement) => buffs => {
    let totalTrueAttack = 0
    let totalTrueElement = 0;
    let totalAffinityPct = 0;
    let totalFreeElement = 0;
    let netCriticalElement = false;
    let topCriticalAttackMult = 1.25;

    const buffList = [];

    _.forEach(buffs, buff => {
        const buffEntry = {
            original: buff
        };

        if (_.has(buff, BuffAccessor.TRUE_ATTACK) || _.has(buff, BuffAccessor.ATTACK_MULT)) {
            let trueAttack = +_.get(buff, BuffAccessor.TRUE_ATTACK, 0);
            const attackMult = +_.get(buff, BuffAccessor.ATTACK_MULT, 1);
            trueAttack = (attackMult - 1) * baseTrueAttack + trueAttack;
            totalTrueAttack += trueAttack;
            _.set(buffEntry, BuffAccessor.TRUE_ATTACK, trueAttack);
        }

        if (_.has(buff, BuffAccessor.TRUE_ELEMENT) || _.has(buff, BuffAccessor.ELEMENT_MULT)) {
            let trueElement = baseTrueElement > 0 ? +_.get(buff, BuffAccessor.TRUE_ELEMENT, 0) : 0;
            const elementMult = +_.get(buff, BuffAccessor.ELEMENT_MULT, 1);
            trueElement = (elementMult - 1) * baseTrueElement + trueElement;
            totalTrueElement += trueElement;
            _.set(buffEntry, BuffAccessor.TRUE_ELEMENT, trueElement);
        }

        if (_.has(buff, BuffAccessor.AFFINITY_PCT)) {
            const affinityPct = +_.get(buff, BuffAccessor.AFFINITY_PCT, 0)
            totalAffinityPct += affinityPct;
            _.set(buffEntry, BuffAccessor.AFFINITY_PCT, affinityPct);
        }

        if (_.has(buff, BuffAccessor.FREE_ELEMENT)) {
            const freeElement = +_.get(buff, BuffAccessor.FREE_ELEMENT, 0);
            totalFreeElement = Math.min(totalFreeElement + freeElement, 100);
            _.set(buffEntry, BuffAccessor.FREE_ELEMENT, freeElement);
        }

        if (_.has(buff, BuffAccessor.CRITICAL_ELEMENT)) {
            const criticalElement = _.get(buff, BuffAccessor.CRITICAL_ELEMENT, false);
            netCriticalElement = netCriticalElement || criticalElement;
            _.set(buffEntry, BuffAccessor.CRITICAL_ELEMENT, criticalElement);
        }

        if (_.has(buff, BuffAccessor.CRITICAL_ATTACK_MULT)) {
            const criticalAttackMult = +_.get(buff, BuffAccessor.CRITICAL_ATTACK_MULT, 0);
            topCriticalAttackMult = Math.max(topCriticalAttackMult, criticalAttackMult);
            _.set(buffEntry, BuffAccessor.CRITICAL_ATTACK_MULT, criticalAttackMult);
        }

        buffList.push(buffEntry);
    });

    return [{
        [BuffAccessor.TRUE_ATTACK]: totalTrueAttack,
        [BuffAccessor.TRUE_ELEMENT]: totalTrueElement,
        [BuffAccessor.AFFINITY_PCT]: totalAffinityPct,
        [BuffAccessor.FREE_ELEMENT]: totalFreeElement,
        [BuffAccessor.CRITICAL_ELEMENT]: netCriticalElement,
        [BuffAccessor.CRITICAL_ATTACK_MULT]: topCriticalAttackMult
    }, buffList];
}

export default calculateDamage;
