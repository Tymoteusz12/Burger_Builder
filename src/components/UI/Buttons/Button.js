import React from 'react';
import classes from './Button.css'

const button = (props) => (
    <div className ={classes.ContinueOrder}>
        <button className={classes.continue} onClick={props.Continue}>Continue to Checkout</button>
        <button className={classes.cancel} onClick={props.Cancel}>Cancel</button>
    </div>
);

export default button;

