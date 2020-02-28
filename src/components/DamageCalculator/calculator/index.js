import _ from 'lodash';
import { attackBloatMap, criticalElementMultMap, combosMap, WeaponType } from './weaponType';
import { attackMultMap, elementMultMap } from './sharpness';

export * from './weaponType';
export * from './sharpness';

export const evaluateCondition = (condition, data) => {
    const accessor = _.get(condition, 'accessor');
    const target = _.get(data, accessor, '');
    const operator = _.get(condition, 'operator');
    const value = _.get(condition, 'value');
    const group = _.map(_.get(condition, 'group'), condition => {
        return evaluateCondition(condition, data);
    });

    switch(operator) {
        case 'startsWith':
            return _.startsWith(target, value);
        case 'endsWith':
            return _.endsWith(target, value);
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
        case '&&':
            return _.every(group, Boolean);
        case '||':
            return _.some(group, Boolean);
        default:
            if (!_.isNil(operator)) {
                console.error('Operator not recognized:', operator);
            }
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

export const BuffAccessor = {
    COMBO_DEPENDENT: 'comboDependent',
    TRUE_ATTACK: 'trueAttack',
    ATTACK_MULT: 'attackMult',
    TRUE_ELEMENT: 'trueElement',
    ELEMENT_MULT: 'elementMult',
    AFFINITY_PCT: 'affinityPct',
    FREE_ELEMENT: 'freeElement',
    CRITICAL_ELEMENT: 'criticalElement',
    CRITICAL_ATTACK_MULT: 'criticalAttackMult'
};

export const attackMultCap = 1 + (1 / 20.75);

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
            original: buff,
            name: _.get(buff, 'name')
        };

        if (_.has(buff, BuffAccessor.TRUE_ATTACK) || _.has(buff, BuffAccessor.ATTACK_MULT)) {
            let trueAttack = +_.get(buff, BuffAccessor.TRUE_ATTACK, 0);
            const attackMult = Math.min(+_.get(buff, BuffAccessor.ATTACK_MULT, 1), attackMultCap);
            trueAttack = Math.round((attackMult - 1) * baseTrueAttack + trueAttack);
            totalTrueAttack += trueAttack;
            _.set(buffEntry, BuffAccessor.TRUE_ATTACK, trueAttack);
        }

        if (_.has(buff, BuffAccessor.TRUE_ELEMENT) || _.has(buff, BuffAccessor.ELEMENT_MULT)) {
            let trueElement = baseTrueElement > 0 ? +_.get(buff, BuffAccessor.TRUE_ELEMENT, 0) : 0;
            const elementMult = +_.get(buff, BuffAccessor.ELEMENT_MULT, 1);
            trueElement = Math.round((elementMult - 1) * baseTrueElement + trueElement);
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

export const calculateAffinityDamageMult = (affinityPct, criticalMult) => {
    if (affinityPct === 0) {
        return 1;
    }

    const affinity = _.clamp(affinityPct, -100, 100) / 100;
    return 1 + affinity * (criticalMult - 1);
}

export const getTrueElementBuffCap = baseTrueElement => {
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

export const BuildAccessor = {
    WEAPON_TYPE: 'weaponType',
    ATTACK: 'attack',
    ELEMENT: 'element',
    HIDDEN_ELEMENT: 'hiddenElement',
    AFFINITY_PCT: 'affinityPct',
    SHARPNESS: 'sharpness',
    BUFFS: 'buffs',
    HITZONE_SEVER_MULT: 'hitzoneSeverMult',
    HITZONE_BLUNT_MULT: 'hitzoneBluntMult',
    HITZONE_PROJECTILE_MULT: 'hitzoneProjectileMult',
    HITZONE_ELEMENTAL_MULT: 'hitzoneElementalMult'
};

export const ComboAccessor = {
    DAMAGE_TYPE: 'damageType',
    MOTION_VALUES: 'motionValues',
    IGNORE_AFFINITY: 'ignoreAffinity',
    IGNORE_SHARPNESS: 'ignoreSharpness'
};

export const DamageType = {
    SEVER: 'sever',
    BLUNT: 'blunt',
    PROJECTILE: 'projectile',
    ELEMENTAL: 'elemental'
}

export const calculateDamage = build => {
    const weaponType = _.get(build, BuildAccessor.WEAPON_TYPE);
    const weaponBloat = _.get(attackBloatMap, weaponType);
    const baseTrueAttack = _.round(+_.get(build, BuildAccessor.ATTACK, 0) / weaponBloat, 2);

    const hiddenElement = Boolean(_.get(build, BuildAccessor.HIDDEN_ELEMENT));
    const baseHiddenTrueElement = _.round(+_.get(build, BuildAccessor.ELEMENT, 0) / 10, 2);

    const baseAffinityPct = +_.get(build, BuildAccessor.AFFINITY_PCT, 0);

    const unresolvedBuffs = _.get(build, BuildAccessor.BUFFS);
    const unresolvedGeneralBuffs = _.filter(unresolvedBuffs, buff => !_.get(buff, BuffAccessor.COMBO_DEPENDENT));
    const unresolvedComboBuffs = _.filter(unresolvedBuffs, BuffAccessor.COMBO_DEPENDENT);

    const freeElement = Math.min(_.flow(_.map, _.compact, _.sum)(unresolvedGeneralBuffs, BuffAccessor.FREE_ELEMENT), 100);
    const baseTrueElement = baseHiddenTrueElement * (hiddenElement ? (freeElement / 100) : 1);

    const sharpness = _.get(build, BuildAccessor.SHARPNESS);
    const sharpnessAttackMult = _.get(attackMultMap, sharpness);
    const sharpnessElementMult = _.get(elementMultMap, sharpness);

    const resolverData = {
        build,
        baseTrueAttack,
        baseHiddenTrueElement,
        baseTrueElement,
        baseAffinityPct
    };

    const generalBuffResolver = getBuffResolver(resolverData);
    const buffAggregator = getBuffAggregator(baseTrueAttack, baseTrueElement);
    const [generalBuffs, generalBuffList] = _.flow(generalBuffResolver, buffAggregator)(unresolvedGeneralBuffs);

    const trueAttackBuff = _.get(generalBuffs, BuffAccessor.TRUE_ATTACK);
    const trueAttack = baseTrueAttack + trueAttackBuff;

    const trueElementBuff = _.get(generalBuffs, BuffAccessor.TRUE_ELEMENT);
    const trueElementBuffCap = getTrueElementBuffCap(baseHiddenTrueElement);
    const trueElement = baseTrueElement + Math.min(trueElementBuff, trueElementBuffCap);

    const affinityPctBuff = _.get(generalBuffs, BuffAccessor.AFFINITY_PCT);
    const affinityPct = _.clamp(baseAffinityPct + affinityPctBuff, -100, 100);

    const criticalAttackMult = _.get(generalBuffs, BuffAccessor.CRITICAL_ATTACK_MULT);
    const criticalElementMult = _.get(criticalElementMultMap, weaponType);
    const affinityAttackMult = calculateAffinityDamageMult(affinityPct, criticalAttackMult);
    const criticalElement = _.get(generalBuffs, BuffAccessor.CRITICAL_ELEMENT);
    const affinityElementMult = criticalElement ? calculateAffinityDamageMult(affinityPct, criticalElementMult) : 1;

    const hitzoneSeverMult = +_.get(build, BuildAccessor.HITZONE_SEVER_MULT, 0.8);
    const hitzoneBluntMult = +_.get(build, BuildAccessor.HITZONE_BLUNT_MULT, 0.8);
    const hitzoneProjectileMult = +_.get(build, BuildAccessor.HITZONE_PROJECTILE_MULT, 0.8);
    const hitzoneElementalMult = +_.get(build, BuildAccessor.HITZONE_ELEMENTAL_MULT, 0.3);

    const combos = _.map(_.get(combosMap, weaponType), combo => {
        const ignoreSharpness = Boolean(_.get(combo, ComboAccessor.IGNORE_SHARPNESS));
        const ignoreAffinity = Boolean(_.get(combo, ComboAccessor.IGNORE_AFFINITY));
        const damageType = _.toLower(_.get(combo, ComboAccessor.DAMAGE_TYPE));
        const motionValues = _.get(combo, ComboAccessor.MOTION_VALUES);

        const comboBuffResolver = getBuffResolver({ ...resolverData, combo });
        const [comboBuffs, comboBuffList] = _.flow(comboBuffResolver, buffAggregator)(unresolvedComboBuffs);

        let basePhysical = Math.round(trueAttack + _.get(comboBuffs, BuffAccessor.TRUE_ATTACK));
        let baseElemental = Math.round(trueElement + _.get(comboBuffs, BuffAccessor.TRUE_ELEMENT)) * hitzoneElementalMult;

        if (
            !_.isEqual(weaponType, WeaponType.LIGHT_BOWGUN)
            && !_.isEqual(weaponType, WeaponType.HEAVY_BOWGUN)
            && !_.isEqual(weaponType, WeaponType.BOW)
            && !ignoreSharpness
        ) {
            basePhysical *= sharpnessAttackMult;
            baseElemental *= sharpnessElementMult;
        }

        switch(damageType) {
            case DamageType.SEVER:
                basePhysical *= hitzoneSeverMult;
                break;
            case DamageType.BLUNT:
                basePhysical *= hitzoneBluntMult;
                break;
            case DamageType.PROJECTILE:
                basePhysical *= hitzoneProjectileMult;
                break;
            default:
                console.warn(`Damage type ${damageType} not recognized`);
        }

        const damageValues = _.map(motionValues, motionValue => {
            const mvBasePhysical = basePhysical * (motionValue / 100);
            const effectivePhysical = mvBasePhysical * (ignoreAffinity ? 1 : affinityAttackMult);
            const effectiveElemental = baseElemental * (ignoreAffinity ? 1 : affinityElementMult);

            return {
                basePhysical: mvBasePhysical,
                baseElemental,
                baseTotal: mvBasePhysical + baseElemental,
                effectivePhysical,
                effectiveElemental,
                effectiveTotal: effectivePhysical + effectiveElemental
            }
        });

        return {
            ...combo,
            damageValues,
            buffs: comboBuffs,
            buffList: comboBuffList
        };
    });

    return {
        ...resolverData,
        attack: Math.round(trueAttack * weaponBloat),
        element: Math.round(trueElement * 10),
        trueAttack: trueAttack,
        trueElement: trueElement,
        affinityPct,
        trueAttackBuff,
        trueElementBuff,
        trueElementBuffCap,
        affinityPctBuff,
        freeElement,
        criticalElement,
        criticalAttackMult,
        criticalElementMult,
        affinityAttackMult,
        affinityElementMult,
        sharpnessAttackMult,
        sharpnessElementMult,
        buffs: _.sortBy(generalBuffList, 'name'),
        combos: _.sortBy(combos, 'name')
    };
}

export default calculateDamage;
