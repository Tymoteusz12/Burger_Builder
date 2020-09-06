import React, { } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
const checkout = props => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutConfirmedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/"/>
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    if(props.ingredients){
        console.log(props.match);
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    checkoutConfirmed={checkoutConfirmedHandler}
                    checkoutCancelled={checkoutCancelledHandler}
                    ingredients={props.ingredients}/>
                <Route path={props.match.path + '/contact-data'} component={ContactData} />
            </div>
        )
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        purchased: state.orderReducer.purchased
    }
}

export default connect(mapStateToProps)(withRouter(checkout));