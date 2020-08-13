import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
class Orders extends Component {
    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    render(){
        let component = <Spinner/>;
        if(this.props.orders && !this.props.loading){
            component = this.props.orders.map(key => {
            return <Order key={key.id} price={+key.price} ingredients={key.ingredients}/>
            })
        }
        return(
            <div>
                {component}
            </div>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));