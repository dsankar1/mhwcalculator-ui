import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import WeaponTypeModule from "../components/WeaponTypeModule";
import { weaponTypes, weaponTypeNames } from "../constants";

const WeaponTypeModules = props => {
    const top = weaponTypes.filter((name, index) => index < weaponTypes.length/2)
        .map(name => <WeaponTypeModule key={name} id={name} name={weaponTypeNames[name]} active={props.selected === name} onClick={props.setWeaponType}/>);
    const bottom = weaponTypes.filter((name, index) => index >= weaponTypes.length/2)
        .map(name => <WeaponTypeModule key={name} id={name} name={weaponTypeNames[name]} active={props.selected === name} onClick={props.setWeaponType}/>);
    return (
        <div className="smooth-scroll" style={{overflowX:"auto", display:"inline-block"}}>
            <div style={{display:"flex"}}>
                {top}
            </div>
            <div style={{display:"flex"}}>
                {bottom}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        selected: state.calculator.weaponType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setWeaponType: weaponType => {
            dispatch(actions.setCalculatorState({weaponType}));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeaponTypeModules);
