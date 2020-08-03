import React, { Component } from 'react';
import ButtonClass from './button.css';
import axios from '../../../axios-orders';
import ContactClass from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        addres: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            person: {
                name: 'Tymoteusz J',
                email: 'test@test.com'
            }
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => this.setState({loading: false}));
    }

    render(){
        let form = (
            <form>
                <input className = {ContactClass.Input} type="text" name="name" placeholder="Your name"/>
                <input className = {ContactClass.Input} type="text" name="email" placeholder="Your email"/>
                <input className = {ContactClass.Input} type="text" name="street" placeholder="Street"/>
                <input className = {ContactClass.Input} type="text" name="postal" placeholder="Postal Code"/>
                <button className={ButtonClass.button} onClick={this.orderHandler}>ORDER</button>
            </form>);
        if(this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={ContactClass.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;