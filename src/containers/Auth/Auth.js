import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import authClasses from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

const auth = props => {
    const [controls, setControls] = useState({
        email: { 
            elementType: 'input',
            elementConfig: {
            type: 'email',
            placeholder: 'Your email'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
        },
        password: { 
            elementType: 'input',
            elementConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
        },
    });
    const [isSignup, setSignup] = useState(true);
    const { building, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if(!building && authRedirectPath !=='/'){
            onSetAuthRedirectPath()
        }
    }, [building, authRedirectPath, onSetAuthRedirectPath])

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
                [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        })
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        setSignup(prevState => !prevState);
    }

    const formElementsArray = [];
    for(let key in controls){
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form = formElementsArray.map(formElement => (
        <Input 
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate = {formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => inputChangedHandler(event, formElement.id)}/>
        ))

    if (props.loading){
        form = <Spinner />
    }

    let errorMessage = null;

    if(props.error){
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    let authRedirect = null;
    if(props.isAuthenticated){
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }
    return (
        <div>
            {authRedirect}
            {errorMessage}
            <form className={authClasses.Auth} onSubmit = {submitHandler}>
                {form}
                <button className={authClasses.continue}>SUBMIT</button>
                <button onClick = {switchAuthModeHandler}
                className={authClasses.cancel}>Switch to {isSignup ? 'SIGNIN' : 'SIGNUP'}</button>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null,
        building: state.authReducer.building,
        authRedirectPath: state.authReducer.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(auth);