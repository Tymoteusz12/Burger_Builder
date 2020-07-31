import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Continue from '../../UI/Buttons/Button';

class OrderSummary extends Component{

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map( igKey => {
            return (<li key={igKey}>
                        <span 
                        style={{textTransform: 'capitalize'}}>{igKey}</span>
                        : {this.props.ingredients[igKey]}
                    </li>)
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: </strong>{this.props.price.toFixed(2)}$</p>
                <Continue Continue={this.props.Confirm} Cancel={this.props.Cancel}/>
            </Aux>
        );
    } 
};

export default OrderSummary;