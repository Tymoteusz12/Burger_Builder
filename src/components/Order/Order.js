import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]})
    }

    let orderIngredients = ingredients.map(ig => {
            return <span style={
                {display: 'inline-block',
                textTransform: 'capitalize',
                margin: '0 10px',
                border: '1px solid black',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 3px 5px 2px black'}
            } key={ig.name}>{ig.name} : ({ig.amount})</span>
        })

    return  (<div className={classes.Order}>
                <p>INGREDIENTS {orderIngredients}</p>
                <p>Price in USD: {props.price.toFixed(2)}</p>
            </div>);
    
};

export default order;