import React, { Component } from "react";
import { connect } from "react-redux";
import { FormControl, Table } from "react-bootstrap";
import { attacks, weaponTypeModifiers, sharpnessModifiers, coatingModifiers, elementCap } from "../constants";
import actions from "../actions";

class CalculationResults extends Component {
    constructor() {
        super();
        this.calculate = this.calculate.bind(this);
        this.calculateAttack = this.calculateAttack.bind(this);
        this.calculateElement = this.calculateElement.bind(this);
        this.calculateAffinity = this.calculateAffinity.bind(this);
        this.calculateMoveDamage = this.calculateMoveDamage.bind(this);
        this.includeSharpness = this.includeSharpness.bind(this);
        this.getElement = this.getElement.bind(this);
    }

    getElement() {
        if (this.props.element < 1) {
            return 0;
        }
        if (this.props.hiddenElement) {
            const freeElement = this.props.skills.find(skill => skill.name === "Free Element");
            if (!freeElement || freeElement.level < 1) {
                return 0;
            }
            const multiplier = freeElement.levels[freeElement.level-1];
            return Math.floor(this.props.element * multiplier["unlock-element"]);
        } else {
            return this.props.element;
        }
    }

    includeSharpness() {
        return (this.props.weaponType !== "bow" && this.props.weaponType !== "light-bowgun" && this.props.weaponType !== "heavy-bowgun");
    }

    calculateAttack(netAffinity) {
        let attack = Math.floor(this.props.attack/weaponTypeModifiers[this.props.weaponType]);
        let affinityModifier = .25;
        let add = 0;
        this.props.skills.forEach(skill => {
            if (skill.level > 0) {
                const modifiers = skill.levels[skill.level-1];
                if (modifiers.attack) {
                    add += modifiers.attack;
                }
                if (skill.name === "Bludgeoner") {
                    add += Math.floor(attack * modifiers[this.props.sharpness]);
                }
                if (modifiers["attack-percent"]) {
                    if (skill.name === "Non-elemental Boost") {
                        add += this.getElement() > 0 ?
                            0 : Math.floor(attack * modifiers["attack-percent"]);
                    } else {
                        add +=  Math.floor(attack * modifiers["attack-percent"]);
                    }
                }
                if (modifiers["affinity-boost"]) {
                  affinityModifier = modifiers["affinity-boost"]/100;
                }
            }
        });
        attack += add;
        attack += 5 * this.props.attackAugments;
        if (this.includeSharpness()) {
            attack = Math.floor(attack * sharpnessModifiers[this.props.sharpness].physical);
        }
        if (this.props.weaponType === "bow") {
            attack = Math.floor(attack * coatingModifiers[this.props.coating]);
        }
        let affinity = netAffinity > 100 ? 1 : netAffinity < -100 ? -1 : netAffinity/100;
        attack = Math.round(attack * (affinity * affinityModifier + 1));
        return attack;
    }

    calculateElement(netAffinity) {
        let element = this.getElement();
        if (element < 1) {
            return 0;
        }
        element = Math.floor(element/10);
        let includeAffinity = this.props.skills.some(skill => skill.name === "Critical Element");
        let add = 0;
        this.props.skills.forEach(skill => {
            if (skill.level > 0) {
                const modifiers = skill.levels[skill.level-1];
                if (modifiers.element) {
                    add += modifiers.element;
                }
                if (modifiers["element-percent"]) {
                    add += Math.floor(element * modifiers["element-percent"]);
                }
            }
        });
        element += Math.floor(elementCap(this.props.element, add)/10);
        if (this.includeSharpness()) {
            element = Math.floor(element * sharpnessModifiers[this.props.sharpness].elemental);
        }
        if (includeAffinity) {
            let affinity = netAffinity > 100 ? 1 : netAffinity < -100 ? -1 : netAffinity/100;
            element = Math.round(element * (affinity * .25 + 1));
        }
        return element;
    }

    calculateAffinity() {
        let affinity = this.props.affinity === "" ? 0 : parseInt(this.props.affinity, 10);
        const augmentMods = [0, 10, 15, 20];
        affinity += augmentMods[this.props.affinityAugments];
        this.props.skills.forEach(skill => {
            if (skill.level > 0) {
                const modifiers = skill.levels[skill.level-1];
                if (modifiers.affinity) {
                    affinity += modifiers.affinity;
                }
            }
        });
        return affinity;
    }

    calculateMoveDamage(trueAttack, trueElement) {
        const physicalEffect = this.props.physicalEffectiveness === "" ?
            1 : parseInt(this.props.physicalEffectiveness, 10)/100;
        const elementEffect = this.props.elementEffectiveness === "" ?
            1 : parseInt(this.props.elementEffectiveness, 10)/100;
        const hits = attacks.find(mv => mv.name === this.props.move).hits;
        let eleDamage = Math.floor(hits.length * trueElement * elementEffect);
        let phyDamage = 0;
        for (let i = 0; i < hits.length; i++) {
            phyDamage += Math.floor(trueAttack * (hits[i]/100));
        }
        phyDamage = Math.floor(phyDamage * physicalEffect);
        return phyDamage + eleDamage;
    }

    calculate() {
        const netAffinity = this.calculateAffinity();
        const trueAttack = this.calculateAttack(netAffinity);
        const trueElement = this.calculateElement(netAffinity);
        return {
            trueAttack,
            trueElement,
            netAffinity,
            moveDamage: this.calculateMoveDamage(trueAttack, trueElement)
        };
    }

    render() {
        const headerStyle = {padding:"10px", textAlign:"center", color:"#555", backgroundColor:"#EEE"};
        const moveOptions = attacks.filter(attack => attack.weapon === this.props.weaponType)
            .map(attack => <option key={attack.name} value={attack.name}>{attack.name}</option>);
        const { trueAttack, trueElement, netAffinity, moveDamage } = this.calculate();
        return (
            <div className="bordered" style={{padding:"12px"}}>
                <Table striped bordered condensed style={{marginBottom:"0"}}>
                    <thead>
                        <tr>
                            <th style={headerStyle}>True Attack</th>
                            <th style={headerStyle}>True Element</th>
                            <th style={headerStyle}>Net Affinity</th>
                            <th style={{width:"300px", backgroundColor:"#EEE"}}>
                                <FormControl value={this.props.move} style={{backgroundColor:"#EEE", borderRadius:"0"}} className="large-font" onChange={e => this.props.setMove(e.target.value)} componentClass="select">
                                    {moveOptions}
                                </FormControl>
                            </th>
                        </tr>
                    </thead>
                    <tbody style={{textAlign:"center"}}>
                        <tr style={{color:"#555"}}>
                            <td>{trueAttack}</td>
                            <td>{trueElement}</td>
                            <td>{netAffinity}%</td>
                            <td>{moveDamage}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        weaponType: state.calculator.weaponType,
        move: state.calculator.mv,
        attack: state.calculator.attack,
        coating: state.calculator.coating,
        element: state.calculator.element,
        affinity: state.calculator.affinity,
        sharpness: state.calculator.sharpness,
        attackAugments: state.calculator.attAug,
        affinityAugments: state.calculator.affAug,
        skills: state.calculator.skills,
        physicalEffectiveness: state.calculator.physicalEffectiveness,
        elementEffectiveness: state.calculator.elementEffectiveness,
        hiddenElement: state.calculator.hiddenElement
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMove: mv => {
            dispatch(actions.setCalculatorState({mv}));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalculationResults);
