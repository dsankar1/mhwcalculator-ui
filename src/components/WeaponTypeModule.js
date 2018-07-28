import React from "react";

const WeaponTypeModule = props => {
    return (
        <div className="weapon-type-module bordered"
        style={{backgroundColor: props.active ? "#70b679":null, display:"flex", cursor:"pointer", flexDirection:"column", width:"110px", minWidth:"110px", height:"90px", minHeight:"90px", margin:"2px", paddingTop:"10px"}}
        onClick={() => props.onClick(props.id)}>
            <div style={{textAlign:"center", fontSize:"0.9em", marginBottom:"2px", color: props.active ? "white" : null}}><b>{props.name}</b></div>
            <img src={process.env.PUBLIC_URL + "/images/" + props.id + ".png"} alt={props.name} style={{width:"40px", alignSelf:"center", marginTop:"4px"}} />
        </div>
    );
}

export default WeaponTypeModule;
