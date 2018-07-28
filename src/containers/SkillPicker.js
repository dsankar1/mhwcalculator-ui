import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import actions from "../actions";
import { skills } from "../constants";
import SkillPill from "../components/SkillPill";

class SkillPicker extends Component {
    constructor() {
        super();
        this.state = {
            skill: ""
        };
        this.addSkill = this.addSkill.bind(this);
    }

    addSkill() {
        if (this.props.skills.some(skill => skill.name.toLowerCase() === this.state.skill.toLowerCase())) {
            return;
        }
        this.props.addSkill(this.state.skill);
        this.setState({skill:""});
    }

    render() {
        const skillPills = this.props.skills.map(skill => <SkillPill key={skill.name} skill={skill} onChange={this.props.setSkillLevel} onRemove={this.props.removeSkill}/>);
        const options = skills.map((skill, index) => <option key={index} value={skill.name}>{skill.name}</option>);
        const blank = this.state.skill.trim() === "";
        return (
            <div className="bordered" style={{padding:"12px", marginBottom:"14px"}}>
                <Form autoComplete="off" onSubmit={e => {
                    e.preventDefault();
                    this.addSkill();
                }}>
                <div style={{marginBottom:"6px", display:"flex", color:"#555"}}>
                    <b style={{flex:1, marginTop:"2px"}}>Skills:</b>
                    <Button bsSize="xsmall" style={{height:"20px"}} disabled={this.props.skills.length === 0} onClick={this.props.removeAllSkills}>
                        Clear
                    </Button>
                </div>
                <InputGroup>
                    <FormControl
                        list="skills"
                        className="large-font"
                        value={this.state.skill}
                        onChange={e => this.setState({skill:e.target.value})}
                        placeholder="Search Skills"
                    />
                        <datalist id="skills">
                            {options}
                        </datalist>
                        <InputGroup.Button>
                            <Button
                                style={{height:"34px"}}
                                disabled={blank}
                                onClick={this.addSkill}>
                                +
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </Form>
                <hr style={{margin:"12px 0"}}/>
                {
                    skillPills.length === 0 ?
                    <div style={{color:"#999", textAlign:"center"}}>No skills added</div> : skillPills
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        skills: state.calculator.skills
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSkill: name => {
            dispatch(actions.addSkill(name));
        },
        removeSkill: name => {
            dispatch(actions.removeSkill(name));
        },
        setSkillLevel: (name, level) => {
            dispatch(actions.setSkillLevel(name, level));
        },
        removeAllSkills: () => {
            dispatch(actions.removeAllSkills());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillPicker);
