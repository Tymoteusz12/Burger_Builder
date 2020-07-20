import React from 'react';
import Aux from '../../../hoc/Auxiliary'
import Continue from '../../UI/Buttons/Button';
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map( igKey => {
        return (<li key={igKey}>
                    <span 
                    style={{textTransform: 'capitalize'}}>{igKey}</span>
                     : {props.ingredients[igKey]}
                </li>)
    });
    return (

        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <Continue Cancel={props.Cancel}/>
        </Aux>
    );
};

export default orderSummary;