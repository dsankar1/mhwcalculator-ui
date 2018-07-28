import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, FormControl, ControlLabel, InputGroup } from "react-bootstrap";
import actions from "../actions";

class DefenseForm extends Component {
    constructor() {
        super();
        this.setField = this.setField.bind(this);
    }

    setField(e) {
        const { name, value } = e.target;
        this.props.setState({[name]:value});
    }

    render() {
        return (
            <div className="bordered" style={{padding:"0 12px 12px 12px"}}>
                <Row>
                    <Col xs={12} sm={6}>
                      <ControlLabel style={{color:"#555", marginTop:"12px"}}>Physical Effectiveness:</ControlLabel>
                      <InputGroup>
                          <FormControl
                              type="number"
                              placeholder="100"
                              className="large-font"
                              name="physicalEffectiveness"
                              value={this.props.physicalResist}
                              onChange={this.setField}/>
                          <InputGroup.Addon>%</InputGroup.Addon>
                      </InputGroup>
                    </Col>
                    <Col xs={12} sm={6}>
                      <ControlLabel style={{color:"#555", marginTop:"12px"}}>Elemental Effectiveness:</ControlLabel>
                      <InputGroup>
                          <FormControl
                              type="number"
                              placeholder="100"
                              className="large-font"
                              name="elementEffectiveness"
                              value={this.props.elementResist}
                              onChange={this.setField}/>
                          <InputGroup.Addon>%</InputGroup.Addon>
                      </InputGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        physicalResist: state.calculator.physicalResist,
        elementResist: state.calculator.elementResist
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setState: data => {
            dispatch(actions.setCalculatorState(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefenseForm);
