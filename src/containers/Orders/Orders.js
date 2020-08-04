import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then((order) => {
            const fetchedOrders = [];
            for(let key in order.data){
                fetchedOrders.push({
                    ...order.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchedOrders})
        })
        .catch(err=>
            this.setState({loading: false}))
    }
    render(){
        let component = <Spinner/>;
        if(this.state.orders && !this.state.loading){
            component = this.state.orders.map(key => {
            
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

export default withErrorHandler(Orders, axios);