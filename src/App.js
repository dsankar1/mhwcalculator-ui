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
                <div style={{margin:"12px 0 22px 0", textAlign:"center"}}>
                    <div style={{marginBottom:"6px"}}>
                        <a className="footer-link" rel="noopener noreferrer" target="_blank" href="https://github.com/dsankar1/mhwcalculator-ui">
                            <i className="fa fa-github fa-lg"/> github.com/dsankar1/mhwcalculator-ui
                        </a>
                    </div>
                    <div style={{display:"inline", margin:"0 6px"}}>
                        <div className="fb-share-button" data-href="http://mhwcalculator.com" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fmhwcalculator.com%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Share</a></div>
                    </div>
                    <div style={{display:"inline", marginLeft:"6px"}}>
                        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="tweet-button twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                    </div>
                </div>
            </Grid>
        </div>
    );
  }
}

export default App;
