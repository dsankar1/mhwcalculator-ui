import React from "react";
import { Modal, Button } from "react-bootstrap";

const Info = props => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title style={{color:"#555"}}>
                <b>Calculator Information</b><br/>
                <small>All division/multipication is rounded down with the exception of affinity. Affinitys effect on damage is rounded to the nearest integer.</small>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{color:"#555", fontSize:"1.1em", height:"300px", overflowY:"auto"}}>
            <div><b>True Attack:</b></div>
            <small><b>Skill Boost</b> is true attack.</small>
            <li>
                Raw Attack / Weapon Bloat + Skills Boost
            </li>
            <div style={{marginTop:"12px"}}><b>True Element:</b></div>
            <small>Elemental cap is taken into account. <b>Skill Boost</b> is raw element.</small>
            <li>
                ( Raw Element + Skills Boost ) / 10
            </li>
            <div style={{marginTop:"12px"}}><b>Affinity:</b></div>
            <small>
                <b>Total Affinity</b> is in decimal format. <b>Affinity Boost</b> ranges from 0.25 to 0.4 depending on levels of Critical Boost.
                With Critical Element, elemental damage benefits from this scaling, but <b>Affinity Boost</b> is locked at 0.25.
            </small>
            <li>
                True Attack &#215; ( Total Affinity &#215; Affinity Boost + 1 )
            </li>
            <div style={{marginTop:"12px"}}><b>Final Physical:</b></div>
            <small><b>Physical Effectiveness</b> represents the percentage of physical damage a target receives through it's defense.</small>
            <li>
                True Attack &#215; Affinity &#215; Sharpness &#215; Motion Value &#215; Physical Effectiveness
            </li>
            <div style={{marginTop:"12px"}}><b>Final Element:</b></div>
            <small><b>Elemental Effectiveness</b> represents the percentage of elemental damage a target receives through it's defense.</small>
            <li>
                True Element &#215; Sharpness &#215; Elemental Effectiveness
            </li>
            <small>With critical element.</small>
            <li>
                True Element &#215; Affinity &#215; Sharpness &#215; Elemental Effectiveness
            </li>
            <div style={{marginTop:"12px"}}><b>Final Total Damage:</b></div>
            <li>
                Final Physical + Final Element
            </li>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
}

export default Info;
