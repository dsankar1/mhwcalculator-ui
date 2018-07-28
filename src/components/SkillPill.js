import React, { Component } from "react";
import { FormControl } from "react-bootstrap";

class SkillPill extends Component {
    constructor() {
        super();
        this.state = {
            hover: false
        };
        this.handleMouseHover = this.handleMouseHover.bind(this);
    }

    handleMouseHover(value) {
        this.setState({hover:value});
    }

    render() {
        let modifiers = "";
        let options = [<option key={0} value={0}>0</option>];
        this.props.skill.levels.forEach((bonuses, index) => {
            options.push(<option key={index+1} value={index+1}>{index+1}</option>)
        });
        if (this.props.skill.level > 0) {
            const target = this.props.skill.levels[this.props.skill.level-1];
            for (let key of Object.keys(target)) {
                modifiers += key + ": +" + target[key] + " ";
            }
        }
        return (
            <div className="bordered"
                style={{display:"flex", padding:"8px", marginTop:"6px", boxShadow:"0 1px 1px rgba(0,0,0,0.1)", alignItems:"center"}}>
                <div onMouseEnter={() => this.handleMouseHover(true)}
                    onMouseLeave={() => this.handleMouseHover(false)}
                    style={{flex:1, display:"flex", flexDirection:"column", justifyContent:"center", marginLeft:"4px"}}>
                    <div>
                        {this.props.skill.name} {this.state.hover ? <i style={{color:"#555", cursor:"pointer"}} onClick={() => this.props.onRemove(this.props.skill.name)} className="fa fa-times"/> : null}
                    </div>
                    {
                        modifiers.trim() === "" ? null :
                        <small style={{color:"#777", fontSize:"0.8em", marginTop:"2px"}}>
                            {modifiers}
                        </small>
                    }
                </div>
                <FormControl
                    bsSize="small"
                    className="large-font skill-dropdown"
                    value={this.props.skill.level}
                    onChange={e => this.props.onChange(this.props.skill.name, e.target.value)}
                    componentClass="select">
                    {options}
                </FormControl>
            </div>
        );
    }
}

export default SkillPill;
