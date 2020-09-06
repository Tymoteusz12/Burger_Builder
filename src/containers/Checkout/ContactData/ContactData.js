import React, { useState } from 'react';
import ButtonClass from './button.css';
import axios from '../../../axios-orders';
import ContactClass from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../../shared/utility';
const contactData = props => {

    const [orderStateForm, setContactData] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        postalCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Postal Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
            type: 'text',
            placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        email: { 
            elementType: 'input',
            elementConfig: {
            type: 'email',
            placeholder: 'Your email'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
        },
        deliveryMethod: { 
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
        },
        validation: {},
        value: 'fastest',
        valid: true
        },
    })
    const [formIsValid, setFormValdity] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const orderForm = {};

        for(let key in orderStateForm){
            orderForm[key] = orderStateForm[key].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: orderForm,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token);
    }

    const inputChangedHandler = (event, inputID) => {

        const updatedFormElement = updateObject(orderStateForm[inputID], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderStateForm[inputID].validation),
            touched: true
        })

        const updatedOrderForm = updateObject(orderStateForm, {
            [inputID]: updatedFormElement
        })

        let formIsValid = true;
        for(let key in updatedOrderForm){
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }
        setContactData(updatedOrderForm); 
        setFormValdity(formIsValid);
    }

    const formElementsArray = [];
    for(let key in orderStateForm){
        formElementsArray.push({
            id: key,
            config: orderStateForm[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => inputChangedHandler(event, formElement.id)}/>
            ))}
            <button disabled={!formIsValid} className={ButtonClass.button}>ORDER</button>
        </form>);
    if(props.loading){
        form = <Spinner/>
    }
    return (
        <div className={ContactClass.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));