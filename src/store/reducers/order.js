import * as actionTypes from '../actions/actionTypes';
import order from '../../components/Order/Order';
import { updateObject } from '../utility';
import { purchaseBurgerSuccess, purchaseBurgerFailed } from '../actions/order';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseStart = (state, action) => {
    return updateObject(state, {loading: true});
}

const purchaseSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId })
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}

const purchaseFailed = (state, action) => {
    return updateObject(state, {loading: false});
}

const purchaseBurgerInit = (state, action) => {
    return updateObject(state, {
        purchased: false
    });
}

const fetchOrderStarted = (state, action) => {
    return updateObject(state, {loading: false});
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
}

const fetchOrderFailed = (state, action) => {
    return updateObject(state, {
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseFailed(state, action);
        case actionTypes.PURCHASE_INIT: return purchaseBurgerInit(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrderStarted(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFailed(state, action);
        default: return state;
    }
}

export default reducer;