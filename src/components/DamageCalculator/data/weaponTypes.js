import { makeStyles } from '@material-ui/core';
import greatSwordIcon from '../../../assets/great-sword.png';
import dualBladesIcon from '../../../assets/dual-blades.png';
import longSwordIcon from '../../../assets/long-sword.png';
import swordAndShieldIcon from '../../../assets/sword-and-shield.png';
import hammerIcon from '../../../assets/hammer.png';
import huntingHornIcon from '../../../assets/hunting-horn.png';
import lanceIcon from '../../../assets/lance.png';
import gunlanceIcon from '../../../assets/gunlance.png';
import switchAxeIcon from '../../../assets/switch-axe.png';
import chargeBladeIcon from '../../../assets/charge-blade.png';
import insectGlaiveIcon from '../../../assets/insect-glaive.png';
import lightBowgunIcon from '../../../assets/light-bowgun.png';
import heavyBowgunIcon from '../../../assets/heavy-bowgun.png';
import bowIcon from '../../../assets/bow.png';

export const useStyles = makeStyles(theme => ({
    button: {
        flex: 1,
        minWidth: '80px',
        minHeight: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: '40px',
        height: '40px',
        maxWidth: '40px',
        maxHeight: '40px'
    }
}));

export const greatSword = {
    name: 'Great Sword',
    icon: greatSwordIcon
};

export const dualBlades = {
    name: 'Dual Blades',
    icon: dualBladesIcon
};

export const longSword = {
    name: 'Long Sword',
    icon: longSwordIcon
};

export const swordAndShield = {
    name: 'Sword & Shield',
    icon: swordAndShieldIcon
};

export const hammer = {
    name: 'Hammer',
    icon: hammerIcon
};

export const huntingHorn = {
    name: 'Hunting Horn',
    icon: huntingHornIcon
};

export const lance = {
    name: 'Lance',
    icon: lanceIcon
};

export const gunlance = {
    name: 'Gunlance',
    icon: gunlanceIcon
};

export const switchAxe = {
    name: 'Switch Axe',
    icon: switchAxeIcon
};

export const chargeBlade = {
    name: 'Charge Blade',
    icon: chargeBladeIcon
};

export const insectGlaive = {
    name: 'Insect Glaive',
    icon: insectGlaiveIcon
};

export const lightBowgun = {
    name: 'Light Bowgun',
    icon: lightBowgunIcon
};

export const heavyBowgun = {
    name: 'Heavy Bowgun',
    icon: heavyBowgunIcon
};

export const bow = {
    name: 'Bow',
    icon: bowIcon
};

export default [
    greatSword,
    dualBlades,
    longSword,
    swordAndShield,
    hammer,
    huntingHorn,
    lance,
    gunlance,
    switchAxe,
    chargeBlade,
    insectGlaive,
    lightBowgun,
    heavyBowgun,
    bow
];
