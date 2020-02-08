export const WeaponType = {
    GREAT_SWORD: 'greatSword',
    DUAL_BLADES: 'dualBlades',
    LONG_SWORD: 'longSword',
    SWORD_AND_SHIELD: 'swordAndShield',
    HAMMER: 'hammer',
    HUNTING_HORN: 'huntingHorn',
    LANCE: 'lance',
    GUNLANCE: 'gunlance',
    SWITCH_AXE: 'switchAxe',
    CHARGE_BLADE: 'chargeBlade',
    INSECT_GLAIVE: 'insectGlaive',
    LIGHT_BOWGUN: 'lightBowgun',
    HEAVY_BOWGUN: 'heavyBowgun',
    BOW: 'bow'
};

export const attackBloatMap = {
    [WeaponType.GREAT_SWORD]: 4.8,
    [WeaponType.DUAL_BLADES]: 1.4,
    [WeaponType.LONG_SWORD]: 3.3,
    [WeaponType.SWORD_AND_SHIELD]: 1.4,
    [WeaponType.HAMMER]: 5.2,
    [WeaponType.HUNTING_HORN]: 4.2,
    [WeaponType.LANCE]: 2.3,
    [WeaponType.GUNLANCE]: 2.3,
    [WeaponType.SWITCH_AXE]: 3.5,
    [WeaponType.CHARGE_BLADE]: 3.6,
    [WeaponType.INSECT_GLAIVE]: 3.1,
    [WeaponType.LIGHT_BOWGUN]: 1.3,
    [WeaponType.HEAVY_BOWGUN]: 1.5,
    [WeaponType.BOW]: 1.2
};

export const criticalElementMultMap = {
    [WeaponType.GREAT_SWORD]: 1.2,
    [WeaponType.DUAL_BLADES]: 1.35,
    [WeaponType.LONG_SWORD]: 1.25,
    [WeaponType.SWORD_AND_SHIELD]: 1.35,
    [WeaponType.HAMMER]: 1.25,
    [WeaponType.HUNTING_HORN]: 1.25,
    [WeaponType.LANCE]: 1.25,
    [WeaponType.GUNLANCE]: 1.25,
    [WeaponType.SWITCH_AXE]: 1.25,
    [WeaponType.CHARGE_BLADE]: 1.25,
    [WeaponType.INSECT_GLAIVE]: 1.25,
    [WeaponType.LIGHT_BOWGUN]: 1.3,
    [WeaponType.HEAVY_BOWGUN]: 1.3,
    [WeaponType.BOW]: 1.35
};

export default WeaponType;
