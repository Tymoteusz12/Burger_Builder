import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
class Checkout extends Component{

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutConfirmedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to="/"/>
        const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
        if(this.props.ingredients){
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        checkoutConfirmed={this.checkoutConfirmedHandler}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        ingredients={this.props.ingredients}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        purchased: state.orderReducer.purchased
    }
}

export default connect(mapStateToProps)(Checkout);