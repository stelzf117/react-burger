import { v4 as uuidv4 } from 'uuid';
import getOrderDetails from '../middleware/order-details'

export const UPDATE_TOTAL_PRICE = 'UPDATE_TOTAL_PRICE';
export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';
export const OPEN_POPUP_ORDER = 'OPEN_POPUP_ORDER';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';
export const CLOSE_POPUP_ORDER = 'CLOSE_POPUP_ORDER';
export const UPDATE_BUN = 'UPDATE_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const CHANGE_INGREDIENT_INDEX = 'CHANGE_INGREDIENT_INDEX';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';

export const addIngredient = (item, index, dispatch) => dispatch({ type: ADD_INGREDIENT, ingredient: item, index: index, key: uuidv4() });
export const updateBun = (item, dispatch) => dispatch({ type: UPDATE_BUN, bun: item });
export const popupOnClose = (dispatch) => {
  dispatch({ type: CLOSE_POPUP_ORDER });
  dispatch({ type: DELETE_ORDER_NUMBER });
}
export const handleItemDelete = (ingredient, dispatch) => {
  dispatch({ type: DELETE_INGREDIENT, ingredient: ingredient });
}
export const changeIngredientIndex = (item, ingredient, dispatch) => {
  dispatch({ type: CHANGE_INGREDIENT_INDEX, ingredient: ingredient, item: item })
}
export const popupOpen = (dispatch) => dispatch(getOrderDetails());