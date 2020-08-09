import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/burger';
import BuildControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
class BurgerBuilder extends Component{
    
    state={
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-a1b90.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients : response.data});
        })
        .catch(error => {
            this.setState({error: true})
        });
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
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
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
        if (this.state.loading){
            orderSummary = <Spinner/>
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
        ingredients: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        add_ingredient: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingrName: ingredientName}),
        del_ingredient: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingrName: ingredientName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));