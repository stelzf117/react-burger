import { GET_ORDER_DETAILS, GET_ORDER_DETAILS_SUCCESS, GET_ORDER_DETAILS_FAILED, OPEN_POPUP_ORDER } from '../actions/constructor';


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
    const url = 'https://norma.nomoreparties.space/api/orders';
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
        .then(respond => {
          if (respond.ok) {
            return respond.json();
          }
          else { Promise.reject(`Ошибка: ${respond.status}`) }
        })
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