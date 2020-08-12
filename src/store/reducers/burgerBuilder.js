import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updateIngredient = {[action.ingrName]: state.ingredients[action.ingrName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updateIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingrName]
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updateIngr = {[action.ingrName]: state.ingredients[action.ingrName] - 1};
    const updatedIngr = updateObject(state.ingredients, updateIngr);
    const updatedSt = {
        ingredients: updatedIngr,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingrName]
    }
    return updateObject(state, updatedSt);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false
    })
}

const fetchingFailed = (state, action) => {
    return updateObject(state, {error: true});
}

const reducer = ( state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchingFailed(state, action);
        default: return state;
        }  
};

export default reducer;