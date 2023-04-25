import itemImage from '../../images/item.png';

import { 
  UPDATE_TOTAL_PRICE,
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  OPEN_POPUP_ORDER,
  DELETE_ORDER_NUMBER,
  CLOSE_POPUP_ORDER,
  UPDATE_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  CHANGE_INGREDIENT_INDEX,
} from '../actions/constructor';

const initialState = {
  bun: {
    name: 'добавьте булочкуㅤㅤㅤㅤ',
    price: 0,
    image: itemImage,
  },
  order: 'number',
  popupVisible: false,
  orderRequest: false,
  orderSuccess: false,
  orderFailed: false,
  totalPrice: 0,
  order: 0,
  ingredients: [],
}

export const constructorReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.totalPrice
      }
    }
    case GET_ORDER_DETAILS: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderSuccess: true,
        order: action.order
      }
    }
    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    case DELETE_ORDER_NUMBER: {
      return {
        ...state,
        order: 0
      }
    }
    case OPEN_POPUP_ORDER: {
      return {
        ...state,
        popupVisible: true
      }
    }
    case CLOSE_POPUP_ORDER: {
      return {
        ...state,
        popupVisible: false
      }
    }
    case UPDATE_BUN: {
      return {
        ...state,
        bun: action.bun
      }
    }
    case ADD_INGREDIENT: {
      const ingredient = action.ingredient;
      const ingredientWithIndex = {
        ...ingredient,
        index: action.index
      }
      return {
        ...state,
        ingredients: [...state.ingredients, ingredientWithIndex]
      }
    }
    case DELETE_INGREDIENT: {
      const index = action.ingredient.index;
      const filtredIngredients = state.ingredients.filter(ingredient => ingredient.index !== index);
      const sortedIngredients = filtredIngredients.map((ingredient, index) => {
        return {
          ...ingredient,
          index: index
        }
      })
      return {
        ...state,
        ingredients: sortedIngredients
      }
    }
    case CHANGE_INGREDIENT_INDEX: {
      const itemIndex = action.item.index;
      const ingredientIndex = action.ingredient.index;
      const newIngredients = state.ingredients.map((ingredient, index) => {
        if (index === itemIndex) {
          return {
            ...ingredient,
            index: ingredientIndex
          }
        } else if (index === ingredientIndex) {
          return {
            ...ingredient,
            index: itemIndex
          }
        } else {
          return ingredient;
        }
      });
      return {
        ...state,
        ingredients: newIngredients
      }
    }
    default: {
      return state
    }
  }
}