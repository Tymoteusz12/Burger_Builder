import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/burger';
import BuildControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { withRouter } from 'react-router-dom';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
class BurgerBuilder extends Component{
    
    state={
        purchasing: false,
    }

    componentDidMount(){
        this.props.onInit_ingredient();
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    purchaseHandler = () =>{
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.props.ingredients){
            burger = (
            <Aux>
                <Burger ingredients={
                    this.props.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.props.add_ingredient}
                    ingredientRemoved={this.props.del_ingredient}
                    disabled={disabledInfo}
                    purchaseable={this.updatePurchaseState(this.props.ingredients)}
                    fullPrice={this.props.price}
                    ordered={this.purchaseHandler}
                    />
            </Aux>
            );
            orderSummary = 
                <OrderSummary 
                    Confirm = {this.purchaseContinueHandler}
                    Cancel = {this.purchaseCancelHandler}
                    ingredients={this.props.ingredients}
                    price={this.props.price}/>
        }
        return(
            <Aux>
                <Modal modalClosed = {this.purchaseCancelHandler} show={this.state.purchasing}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        error: state.burgerReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        add_ingredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        del_ingredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInit_ingredient: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));