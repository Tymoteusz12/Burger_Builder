import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className = {classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
        onClick = {props.removed} 
        className = {classes.Less} 
        disabled={props.disabled}>Less</button>
        <button onClick = {props.added} className = {classes.More}>More</button>
        <p className={classes.p}>{props.price}$</p>
    </div>
);

export default buildControl;