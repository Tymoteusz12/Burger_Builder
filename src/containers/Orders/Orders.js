import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
const orders = props => {
    const { onFetchOrders } = props;
    useEffect(() => {
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders])

    let component = <Spinner/>;
    if(props.orders && !props.loading){
        component = props.orders.map(key => {
        return <Order key={key.id} price={+key.price} ingredients={key.ingredients}/>
        })
    }
    return(
        <div>
            {component}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));