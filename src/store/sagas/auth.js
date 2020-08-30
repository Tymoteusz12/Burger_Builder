import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationTime');
    yield localStorage.removeItem('userID');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime*1000);
    yield put(actions.authLogout());
}

export function* authSaga(action){
    yield put(actions.authStart());
        const authData = {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1v5cdL0EuB9UeZjaoVTQ-83VrNq2npZk';
        if(!action.isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1v5cdL0EuB9UeZjaoVTQ-83VrNq2npZk'
        }
        try{
        const response = yield axios.post(url, authData)
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userID', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
        }catch(err){
            yield put(actions.authFail(err.response.data.error));
            }
}

export function* autoLoginSaga(action){
    const token = yield localStorage.getItem('token');
    if(!token){
        yield put(actions.authLogout());
    } else{
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate > new Date()){
            const userId = yield localStorage.getItem('userID');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        } else {
            yield put(actions.authLogout());
        }
    }

}