import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import WeaponTypeModules from "./WeaponTypeModules";
import WeaponStatsForm from "./WeaponStatsForm";
import CalculationResults from "./CalculationResults";
import WeaponLoader from "./WeaponLoader";
import SkillPicker from "./SkillPicker";
import DefenseForm from "./DefenseForm";

class Calculator extends Component {
    render() {
        return (
            <Row>
              <Col xs={12} md={9} style={{marginBottom:"12px"}}>
                <WeaponLoader/>
                <CalculationResults/>
                <div className="bordered" style={{padding:"24px 12px 12px 12px", margin:"10px 0"}}>
                  <div style={{display:"flex", justifyContent:"center", marginBottom:"12px"}}>
                    <WeaponTypeModules/>
                  </div>
                  <WeaponStatsForm/>
                </div>
                <DefenseForm/>
              </Col>
              <Col xs={12} md={3}>
                <SkillPicker/>
              </Col>
            </Row>
        );
    }
}

export default Calculator;
