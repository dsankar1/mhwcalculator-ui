import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { Grid } from "react-bootstrap";
import Calculator from "./containers/Calculator";
import Info from "./components/Info";
import AppNav from "./components/AppNav";

class App extends Component {

    state = {
        info: false
    }

  render() {
    return (
        <div>
            <Info show={this.state.info} onHide={() => this.setState({info:false})}/>
            <div style={{backgroundColor:"#FAFAFA"}}>
                <Grid>
                  <h1 style={{color:"#555"}}>Monster Hunter World: Damage Calculator <span style={{cursor:"pointer"}} onClick={() => this.setState({info:true})}>&#9432;</span></h1>
                  <p style={{color:"#666"}}>
                      This application calculates damage numbers you can expect to hit in Monster Hunter: World.
                      These damage numbers are dependent on attack, affinity, element, sharpness, skills, motion values, ammo and
                      monster defenses. A detailed explaination of the calulations can be found by clicking the information icon
                      located above.
                  </p>
                </Grid>
            </div>
            <AppNav/>
            <Grid>
                <Switch>
                    <Route path="/" exact component={Calculator}/>
                    <Route path="/presets" render={() => <div style={{textAlign:"center", color:"#555"}}><h3>Coming Soon</h3></div>}/>
                    <Route render={() => <Redirect to="/"/>}/>
                </Switch>
            </Grid>
        </div>
    );
  }
}

export default App;
