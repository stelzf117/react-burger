import { GET_ORDER_DETAILS, GET_ORDER_DETAILS_SUCCESS, GET_ORDER_DETAILS_FAILED, OPEN_POPUP_ORDER, CLEAR_INGREDIENTS } from '../actions/constructor';
import { BASE_URL } from '../../utils/constants';
import { checkResponse } from '../../utils/checkResponse';


const getIngredientsId = ( ingredients, bun ) => {
  if ( ingredients.length === 0 || bun._id === undefined ) {
    return undefined
  }

  const array = ingredients.map(item => item._id)
  array.push(bun._id)
  return { ingredients: array }
}

export default function getOrderDetails() {
  return async (dispatch, getState) => {
    const url = `${BASE_URL}/orders`;
    const { ingredients, bun } = getState().constructorReducer;
    const ingredientsId = getIngredientsId(ingredients, bun);
    const body = JSON.stringify(ingredientsId)
    const headers = {
      'Content-Type': 'application/json',
    };
    if (ingredientsId !== undefined) {
      dispatch({
        type: GET_ORDER_DETAILS
      })
      await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      })
        .then(respond => checkResponse(respond))
        .then(object => {
          dispatch({ 
            type: GET_ORDER_DETAILS_SUCCESS,
            order: object.order.number
           })
        })
        .then(() => {
          dispatch({
            type: OPEN_POPUP_ORDER
          })
          dispatch({
            type: CLEAR_INGREDIENTS
          })
        })
        .catch(e => {
          dispatch({
            type: GET_ORDER_DETAILS_FAILED
          })
          console.log(e);
        })
    }
  }
}