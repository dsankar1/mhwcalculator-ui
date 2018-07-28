import React from "react";
import { sharpness } from "../constants";

const SharpnessPicker = props => {
    const style = {width:"60px", height:"20px", border:"1px solid #DDD", borderRight:"none", cursor:"pointer", textAlign:"center"};
    return (
        <div style={{display:"flex"}}>
            <div style={{...style, backgroundColor:"#ffffff"}} onClick={() => props.onChange(sharpness.white)}>
                {props.sharpness === sharpness.white ? <i className="fa fa-check"/> : null}
            </div>
            <div style={{...style, backgroundColor:"#2c86d9", color:"white"}} onClick={() => props.onChange(sharpness.blue)}>
                {props.sharpness === sharpness.blue ? <i className="fa fa-check"/> : null}
            </div>
            <div style={{...style, backgroundColor:"#70d92c"}} onClick={() => props.onChange(sharpness.green)}>
                {props.sharpness === sharpness.green ? <i className="fa fa-check"/> : null}
            </div>
            <div style={{...style, backgroundColor:"#d9d12c"}} onClick={() => props.onChange(sharpness.yellow)}>
                {props.sharpness === sharpness.yellow ? <i className="fa fa-check"/> : null}
            </div>
            <div style={{...style, backgroundColor:"#d9662c", color:"white"}} onClick={() => props.onChange(sharpness.orange)}>
                {props.sharpness === sharpness.orange ? <i className="fa fa-check"/> : null}
            </div>
            <div style={{...style, borderRight:"1px solid #DDD", backgroundColor:"#d92c2c", color:"white"}} onClick={() => props.onChange(sharpness.red)}>
                {props.sharpness === sharpness.red ? <i className="fa fa-check"/> : null}
            </div>
        </div>
    );
}

export default SharpnessPicker;
