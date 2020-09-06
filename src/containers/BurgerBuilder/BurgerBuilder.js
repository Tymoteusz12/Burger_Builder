import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/burger';
import BuildControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

export const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    const { onInit_ingredient } = props;
    useEffect(() =>{
        onInit_ingredient();
    }, [onInit_ingredient]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    const purchaseHandler = () =>{
        if(props.isAuthenticated){
            setPurchasing(true);
        }else {
            props.onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...props.ingredients
    };
    for (let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if(props.ingredients){
        burger = (
        <Aux>
            <Burger ingredients={
                props.ingredients}/>
            <BuildControls 
                ingredientAdded={props.add_ingredient}
                ingredientRemoved={props.del_ingredient}
                disabled={disabledInfo}
                purchaseable={updatePurchaseState(props.ingredients)}
                fullPrice={props.price}
                ordered={purchaseHandler}
                isAuth={props.isAuthenticated}
                />
        </Aux>
        );
        orderSummary = 
            <OrderSummary 
                Confirm = {purchaseContinueHandler}
                Cancel = {purchaseCancelHandler}
                ingredients={props.ingredients}
                price={props.price}/>
    }
    return(
        <Aux>
            <Modal modalClosed = {purchaseCancelHandler} show={purchasing}> 
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        error: state.burgerReducer.error,
        isAuthenticated: state.authReducer.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        add_ingredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        del_ingredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInit_ingredient: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));