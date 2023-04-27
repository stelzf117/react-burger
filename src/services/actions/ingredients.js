export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENT_INFORMATION = 'GET_INGREDIENT_INFORMATION';
export const DELETE_INGREDIENT_INFORMATION = 'DELETE_INGREDIENT_INFORMATION';
export const OPEN_POPUP = 'OPEN_POPUP';
export const DELETE_VIEWED_iNGREDIENT = 'DELETE_VIEWED_iNGREDIENT';
export const CLOSE_POPUP = 'CLOSE_POPUP';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const INCREMENT_INGREDIENT_COUNTER = 'INCREMENT_INGREDIENT_COUNTER';
export const DECREMENT_INGREDIENT_COUNTER = 'DECREMENT_INGREDIENT_COUNTER';
export const CLEAR_INGREDIENT_COUNTER = 'CLEAR_INGREDIENT_COUNTER';

export const incrementIngredientCounter = (item, dispatch) => dispatch({ type: INCREMENT_INGREDIENT_COUNTER, ingredient: item });
export const handleItemDecrement = (ingredient, dispatch) => {
  dispatch({ type: DECREMENT_INGREDIENT_COUNTER, ingredient: ingredient });
}
export const popupOnClose = dispatch => { 
  dispatch({ type: CLOSE_POPUP })
  dispatch({ type: DELETE_VIEWED_iNGREDIENT })
}
export const getIngredientInformation = (dispatch, ingredient) => {
  dispatch({
    type: GET_INGREDIENT_INFORMATION,
    ingredient: ingredient
  });
  dispatch({
    type: OPEN_POPUP
  })
};
export const setActiveTab = (dispatch, index) => dispatch({ type: SET_ACTIVE_TAB, activeTab: index });
export const clearIngredientCounter = dispatch => dispatch({ type: CLEAR_INGREDIENT_COUNTER })