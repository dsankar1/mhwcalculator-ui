import React from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";

const AppNav = props => {
    return (
        <Navbar collapseOnSelect style={{borderRadius:"0", marginBottom:"12px"}}>
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse style={{paddingLeft:"0"}}>
            <Nav>
              <NavItem active={props.location.pathname === "/"} onClick={e => props.history.push("/")}>
                &nbsp;Calculator&nbsp;
              </NavItem>
              <NavItem active={props.location.pathname.startsWith("/presets")} onClick={e => props.history.push("/presets")}>
                &nbsp;Presets&nbsp;
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(AppNav);
