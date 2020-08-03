import React from 'react';
import Burger from '../../Burger/burger';
import Button from '../../UI/Buttons/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) =>{

    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', height: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button Continue={props.checkoutConfirmed} Cancel={props.checkoutCancelled}/>
        </div>
    )
}

export default checkoutSummary;