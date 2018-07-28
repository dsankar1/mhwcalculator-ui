import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, FormControl, ButtonGroup, Button, ControlLabel, InputGroup, Checkbox } from "react-bootstrap";
import actions from "../actions";
import SharpnessPicker from "../components/SharpnessPicker";
import { coatings } from "../constants";

class WeaponStatsForm extends Component {
    constructor() {
        super();
        this.setData = this.setData.bind(this);
        this.showSharpness = this.showSharpness.bind(this);
    }

    showSharpness() {
        return (this.props.weaponType !== "bow" && this.props.weaponType !== "light-bowgun" && this.props.weaponType !== "heavy-bowgun");
    }

    setData(e) {
        const { name, value } = e.target;
        this.props.setState({ [name]: value });
    }

    render() {
        let attackAugments = new Array(3);
        let affinityAugments = new Array(3);
        for (let i = 0; i < 4; i++) {
            attackAugments.push(
                <Button
                    key={i}
                    disabled={this.props.attAug === i}
                    bsStyle={this.props.attAug === i ? null:"default"}
                    onClick={() => this.props.setState({attAug:i})}>
                    {i}
                </Button>
            );
            affinityAugments.push(
                <Button
                    key={i}
                    disabled={this.props.affAug === i}
                    bsStyle={this.props.affAug === i ? null:"default"}
                    onClick={() => this.props.setState({affAug:i})}>
                    {i}
                </Button>
            );
        }
        return (
            <Row>
                <Col xs={12} md={4} style={{margin:"4px 0"}}>
                    <ControlLabel style={{color:"#555"}}>Attack:</ControlLabel>
                    <FormControl
                        type="number"
                        className="large-font"
                        placeholder="0"
                        name="attack"
                        value={this.props.attack}
                        onChange={this.setData}/>
                </Col>
                <Col xs={12} md={4} style={{margin:"4px 0", position:"relative"}}>
                    <div style={{position:"absolute", right:"0", marginRight:"10px"}}>
                        <small style={{display:"flex", color:"#777"}}>
                            <div style={{marginTop:"2px", marginRight:"4px"}}>Hidden Element</div>
                            <Checkbox 
                                checked={this.props.hiddenElement} 
                                onClick={() => this.props.setState({hiddenElement: !this.props.hiddenElement})} 
                                style={{margin:"0"}}/>
                        </small>
                    </div>
                    <ControlLabel style={{color:"#555"}}>Element:</ControlLabel>
                    <FormControl
                        type="number"
                        className="large-font"
                        placeholder="0"
                        name="element"
                        value={this.props.element}
                        onChange={this.setData}/>
                </Col>
                <Col xs={12} md={4} style={{margin:"4px 0"}}>
                    <ControlLabel style={{color:"#555"}}>Affinity:</ControlLabel>
                    <InputGroup>
                        <FormControl
                            type="number"
                            className="large-font"
                            placeholder="0"
                            name="affinity"
                            value={this.props.affinity}
                            onChange={this.setData}/>
                        <InputGroup.Addon>%</InputGroup.Addon>
                    </InputGroup>
                </Col>
                <Col xs={12} md={7} style={{margin:"4px 0"}}>
                {
                    this.showSharpness() ?
                    <div>
                        <ControlLabel style={{color:"#555", marginTop:"13px"}}>Sharpness:</ControlLabel>
                        <SharpnessPicker sharpness={this.props.sharpness} onChange={sharpness => this.props.setState({sharpness})}/>
                    </div> : null
                }
                {
                    this.props.weaponType === "bow" ?
                    <div>
                        <ControlLabel style={{color:"#555"}}>Coatings:</ControlLabel><br/>
                        <ButtonGroup>
                            <Button
                                onClick={() => this.props.setState({coating:coatings.none})}
                                disabled={this.props.coating === coatings.none}
                                bsStyle={this.props.coating === coatings.none ? null:"default"}>
                                None
                            </Button>
                            <Button
                                onClick={() => this.props.setState({coating:coatings.spread})}
                                disabled={this.props.coating === coatings.spread}
                                bsStyle={this.props.coating === coatings.spread ? null:"default"}>
                                Spread
                            </Button>
                            <Button
                                onClick={() => this.props.setState({coating:coatings.power})}
                                disabled={this.props.coating === coatings.power}
                                bsStyle={this.props.coating === coatings.power ? null:"default"}>
                                Power
                            </Button>
                        </ButtonGroup>
                    </div> : null
                }
                </Col>
                <Col xs={12} lg={5} style={{margin:"4px 0"}}>
                    <div style={{display:"flex", justifyContent:"flex-end"}}>
                        <div style={{marginRight:"12px"}}>
                            <ControlLabel style={{color:"#555"}}>Attack Augments:</ControlLabel><br/>
                            <ButtonGroup>
                                {attackAugments}
                            </ButtonGroup>
                        </div>
                        <div>
                            <ControlLabel style={{color:"#555"}}>Affinity Augments:</ControlLabel><br/>
                            <ButtonGroup>
                                {affinityAugments}
                            </ButtonGroup>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        weaponType: state.calculator.weaponType,
        attack: state.calculator.attack,
        element: state.calculator.element,
        affinity: state.calculator.affinity,
        sharpness: state.calculator.sharpness,
        attAug: state.calculator.attAug,
        affAug: state.calculator.affAug,
        coating: state.calculator.coating,
        hiddenElement: state.calculator.hiddenElement
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setState: data => {
            dispatch(actions.setCalculatorState(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeaponStatsForm);
