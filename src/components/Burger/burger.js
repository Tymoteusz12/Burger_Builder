import React from 'react';
import classes from './burger.css';
import BurgerIngredient from './BurgerIngridient/BurgerIngridient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) =>
            {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        })
            .reduce((arr, el) => {
                return arr.concat(el);
            }, []); // reduce takes two args for arrow func:
            // new array and element of array we are looping through
            // then with method concat we join el to array, so we have new array
            // we reduced 2 dimensions to 1, 2d -> 1d
        if (transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding ingredients!</p>
        }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
