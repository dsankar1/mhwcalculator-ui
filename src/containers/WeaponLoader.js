import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, FormControl, InputGroup, Form } from "react-bootstrap";
import actions from "../actions";
import { weapons } from "../constants";

class WeaponLoader extends Component {
    constructor() {
        super();
        this.state = {
            weapon: ""
        };
        this.weaponsList = weapons.map((weapon, index) => <option key={index} value={weapon.name}>{weapon.name}</option>);
        this.setWeapon = this.setWeapon.bind(this);
    }

    setWeapon() {
        if (this.state.weapon.trim() === "") {
          return;
        }
        const weapon = weapons.find(weapon => weapon.name === this.state.weapon);
        if (weapon === undefined) {
            return;
        }
        this.props.setWeapon({
            weaponType: weapon.type,
            attack: weapon.attack,
            affinity: weapon.affinity,
            element: weapon.element,
            sharpness: weapon.sharpness
        });
    }

    render() {
        const blank = this.state.weapon.trim() === "";
        return (
            <div className="bordered" style={{padding:"12px", marginBottom:"10px"}}>
                <Form autoComplete="off" onSubmit={e => {
                        e.preventDefault();
                        this.setWeapon();
                    }}>
                    <div style={{display:"flex"}}>
                        <div className="weapon-loader">
                            <InputGroup>
                                <InputGroup.Addon>
                                  <i className="fa fa-search"/>
                                </InputGroup.Addon>
                                <FormControl
                                    list="weapons"
                                    className="large-font"
                                    value={this.state.weapon}
                                    onChange={e => this.setState({weapon: e.target.value})}
                                    placeholder="Search Weapons"/>
                                    {
                                        !blank ?
                                        <datalist id="weapons">
                                            {this.weaponsList}
                                        </datalist> : null
                                    }
                                <InputGroup.Button>
                                    <Button style={{height:"34px"}} disabled={blank} onClick={this.setWeapon}>
                                        <i className="fa fa-download" style={{marginTop:"4px", color:blank ? "inherit":"#555"}}/>
                                    </Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </div>
                        <div className="clear-all-btn">
                            <Button
                                bsStyle="danger"
                                className="clear-all-btn"
                                onClick={() => this.props.clearAll()}>
                                Reset Build
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setWeapon: weapon => {
            dispatch(actions.setCalculatorState(weapon));
        },
        clearAll: () => {
            dispatch(actions.clearCalculatorState());
        }
    }
}

export default connect(null, mapDispatchToProps)(WeaponLoader);
