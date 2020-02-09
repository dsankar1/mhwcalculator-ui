import _ from 'lodash';
import { attackBloatMap, criticalElementMultMap, combosMap } from './weaponType';
import { attackMultMap, elementMultMap } from './sharpness';

export * from './weaponType';
export * from './sharpness';
export * from './attacks';

export const BuildAccessor = {
    WEAPON_TYPE: 'weaponType',
    SHARPNESS: 'sharpness',
    AFFINITY_PCT: 'affinityPct',
    ATTACK: 'attack',
    ELEMENTS: 'elements',
    STATUSES: 'statuses',
    BUFFS: 'buffs'
};

export const BuffAccessor = {
    TRUE_ATTACK: 'trueAttack',
    ATTACK_MULT: 'attackMult',
    AFFINITY_PCT: 'affinityPct',
    TRUE_ELEMENT: 'trueElement',
    ELEMENT_MULT: 'elementMult',
    FREE_ELEMENT: 'freeElement',
    CRITICAL_ELEMENT: 'criticalElement',
    CRITICAL_ATTACK_MULT: 'criticalAttackMult'
};

export const calculateDamage = build => {
    const weaponType = _.get(build, BuildAccessor.WEAPON_TYPE);
    const weaponBloat = _.get(attackBloatMap, weaponType);
    const baseTrueAttack = +_.get(build, BuildAccessor.ATTACK, 0) / weaponBloat;

    const baseTrueElement = +_.get(build, `${BuildAccessor.ELEMENTS}[0].damage`, 0) / 10;
    const hiddenElement = _.get(build, `${BuildAccessor.ELEMENTS}[0].hidden`, false);

    const baseAffinityPct = +_.get(build, BuildAccessor.AFFINITY_PCT, 0);

    const sharpness = _.get(build, BuildAccessor.SHARPNESS);
    const sharpnessAttackMult = _.get(attackMultMap, sharpness);
    const sharpnessElementMult = _.get(elementMultMap, sharpness);

    const combos = _.map(_.get(combosMap, weaponType), combo => {
        const buffs = _.get(build, BuildAccessor.BUFFS);
        const withBuffFuncCaller = createBuffFuncCaller(build, combo);
        const withBuffAggregator = createBuffAggregator(baseTrueAttack, baseTrueElement);
        const aggregateBuffs = createBuffsAggregator(baseTrueAttack, baseTrueElement);
        const processBuffs = _.flow(callBuffFuncs, aggregateBuffs);
        const [buffs, buffsBreakdown] = processBuffs(_.get(build, BuildAccessor.BUFFS));

        const damageValues = _.map(combo.motionValues, motionValue => {

        });

        return {
            ...combo,
            damageValues
        };
    });

    const callBuffFuncs = createBuffFuncCaller(build);
    const aggregateBuffs = createBuffsAggregator(baseTrueAttack, baseTrueElement);
    const processBuffs = _.flow(callBuffFuncs, aggregateBuffs);
    const [buffs, buffsBreakdown] = processBuffs(_.get(build, BuildAccessor.BUFFS));
    
    const trueAttack = baseTrueAttack + buffs.trueAttack;
    const trueElement = (baseTrueElement + buffs.trueElement) * (hiddenElement ? (buffs.freeElement / 100) : 1);

    const affinityPct = baseAffinityPct + buffs.affinityPct;
    const criticalAttackMult = _.get(buffs, BuffAccessor.CRITICAL_ATTACK_MULT, 1.25);
    const criticalElementMult = _.get(criticalElementMultMap, weaponType);
    const affinityAttackMult = calculateAffinityDamageMult(affinityPct, criticalAttackMult);
    const affinityElementMult = buffs.criticalElement ? calculateAffinityDamageMult(affinityPct, criticalElementMult) : 1;

    const weaponTypeAttacks = _.map(_.get(weaponTypeAttackMap, weaponType), weaponTypeAttack => {
        const damageValues = _.map(weaponTypeAttack.motionValues, motionValue => {
            const physical = Math.floor(Math.round(trueAttack) * sharpnessAttackMult * affinityAttackMult * (motionValue / 100));
            const element = Math.floor(Math.round(trueElement) * sharpnessElementMult * affinityElementMult);
            const total = physical + element;
            return {
                physical,
                element,
                total
            };
        });
        return {
            ...weaponTypeAttack,
            damageValues
        };
    });

    return {
        attack: Math.round(trueAttack * weaponBloat),
        element: Math.round(trueElement * 10),
        trueAttack: Math.round(trueAttack),
        trueElement: Math.round(trueElement),
        affinityPct,
        buffs,
        buffsBreakdown,
        weaponBloat,
        weaponTypeAttacks,
        criticalAttackMult,
        criticalElementMult,
        affinityAttackMult,
        affinityElementMult,
        sharpnessAttackMult,
        sharpnessElementMult
    };
}

export const calculateAffinityDamageMult = (affinityPct, criticalMult) => {
    if (affinityPct === 0) {
        return 1;
    }

    const affinity = _.clamp(affinityPct, -100, 100) / 100;
    const adjustedCritMult = criticalMult - 1;
    return 1 + affinity * adjustedCritMult;
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

export const createBuffAggregator = (baseTrueAttack, baseTrueElement) => buffs => {
    let totalTrueAttack = 0
    let totalTrueElement = 0;
    let totalAffinityPct = 0;
    let totalFreeElement = 0;
    let netCriticalElement = false;
    let topCriticalAttackMult = 1.25;

    _.forEach(buffs, buff => {
        if (_.has(buff, BuffAccessor.TRUE_ATTACK) || _.has(buff, BuffAccessor.ATTACK_MULT)) {
            let trueAttack = +_.get(buff, BuffAccessor.TRUE_ATTACK, 0);
            const attackMult = +_.get(buff, BuffAccessor.ATTACK_MULT, 1);
            trueAttack = (attackMult - 1) * baseTrueAttack + trueAttack;
            totalTrueAttack += trueAttack;
            _.set(breakdownEntry, BuffAccessor.TRUE_ATTACK, trueAttack);
        }

        if (_.has(buff, BuffAccessor.TRUE_ELEMENT) || _.has(buff, BuffAccessor.ELEMENT_MULT)) {
            let trueElement = baseTrueElement > 0 ? +_.get(buff, BuffAccessor.TRUE_ELEMENT, 0) : 0;
            const elementMult = +_.get(buff, BuffAccessor.ELEMENT_MULT, 1);
            trueElement = (elementMult - 1) * baseTrueElement + trueElement;
            totalTrueElement += trueElement;
            _.set(breakdownEntry, BuffAccessor.TRUE_ELEMENT, trueElement);
        }

        if (_.has(buff, BuffAccessor.AFFINITY_PCT)) {
            const affinityPct = +_.get(buff, BuffAccessor.AFFINITY_PCT, 0)
            totalAffinityPct += affinityPct;
            _.set(breakdownEntry, BuffAccessor.AFFINITY_PCT, affinityPct);
        }

        if (_.has(buff, BuffAccessor.FREE_ELEMENT)) {
            const freeElement = +_.get(buff, BuffAccessor.FREE_ELEMENT, 0);
            totalFreeElement = Math.min(totalFreeElement + freeElement, 100);
            _.set(breakdownEntry, BuffAccessor.FREE_ELEMENT, freeElement);
        }

        if (_.has(buff, BuffAccessor.CRITICAL_ELEMENT)) {
            const criticalElement = _.get(buff, BuffAccessor.CRITICAL_ELEMENT, false);
            netCriticalElement = netCriticalElement || criticalElement;
            _.set(breakdownEntry, BuffAccessor.CRITICAL_ELEMENT, criticalElement);
        }

        if (_.has(buff, BuffAccessor.CRITICAL_ATTACK_MULT)) {
            const criticalAttackMult = +_.get(buff, BuffAccessor.CRITICAL_ATTACK_MULT, 0);
            topCriticalAttackMult = Math.max(topCriticalAttackMult, criticalAttackMult);
            _.set(breakdownEntry, BuffAccessor.CRITICAL_ATTACK_MULT, criticalAttackMult);
        }
    });

    const trueElementCap = getTrueElementCap(baseTrueElement);    
    totalTrueElement = Math.min(totalTrueElement, trueElementCap);

    return {
        [BuffAccessor.TRUE_ATTACK]: totalTrueAttack,
        [BuffAccessor.TRUE_ELEMENT]: totalTrueElement,
        [BuffAccessor.AFFINITY_PCT]: totalAffinityPct,
        [BuffAccessor.FREE_ELEMENT]: totalFreeElement,
        [BuffAccessor.CRITICAL_ELEMENT]: netCriticalElement,
        [BuffAccessor.CRITICAL_ATTACK_MULT]: topCriticalAttackMult
    };
}

export default calculateDamage;
