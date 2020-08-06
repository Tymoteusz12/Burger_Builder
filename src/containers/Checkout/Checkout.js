import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
class Checkout extends Component{
    state = {
        ingredients: {
            bacon: 0,
            cheese: 0, 
            meat: 0, 
            salad: 0
        },
        totalPrice: 4
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                price=param[1];
            }
            else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients:ingredients, totalPrice:price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutConfirmedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                checkoutConfirmed={this.checkoutConfirmedHandler}
                checkoutCancelled={this.checkoutCancelledHandler}
                ingredients={this.state.ingredients}/>
                <Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData {...props} price={this.state.totalPrice} ingredients={this.state.ingredients}/>)} />
            </div>
        );
    }
}

export default Checkout;