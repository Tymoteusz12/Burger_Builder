import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import authClasses from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
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
            },
            isSignup: true
    }

    componentDidMount () {
        if(!this.props.building && this.props.authRedirectPath !=='/'){
            this.props.onSetAuthRedirectPath()
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
                [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
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
            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            ))

        if (this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return (
            <div>
                {authRedirect}
                {errorMessage}
                <form className={authClasses.Auth} onSubmit = {this.submitHandler}>
                    {form}
                    <button className={authClasses.continue}>SUBMIT</button>
                    <button onClick = {this.switchAuthModeHandler}
                    className={authClasses.cancel}>Switch to {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</button>
                </form>
            </div>
        );
    }
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

export default connect( mapStateToProps, mapDispatchToProps)(Auth);