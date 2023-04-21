import { 
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENT_INFORMATION,
  DELETE_INGREDIENT_INFORMATION,
  OPEN_POPUP,
  DELETE_VIEWED_iNGREDIENT,
  CLOSE_POPUP,
} from "../actions/ingredients";

const initialState = {
  ingredientsRequest: false,
  ingredientsSuccess: false,
  ingredientsFailed: false,
  error: '',
  popupVisible: false,
  viewedIngredient: {},
  ingredients: {
    bun: [],
    main: [],
    sauce: [],
  }
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return { ...state, ingredientsRequest: true}
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { 
        ...state, 
        ingredientsRequest: false,
        ingredientsSuccess: true,
        ingredients: {
          bun: action.ingredients.bun,
          main: action.ingredients.main,
          sauce: action.ingredients.sauce,
        }
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return { 
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
        error: action.error
      }
    }
    case GET_INGREDIENT_INFORMATION: {
      return {
        ...state,
        viewedIngredient: action.ingredient
      }
    }
    case DELETE_INGREDIENT_INFORMATION: {
      return {
        ...state,
        viewedIngredient: {}
      }
    }
    case OPEN_POPUP: {
      return {
        ...state,
        popupVisible: true
      }
    }
    case CLOSE_POPUP: {
      return {
        ...state,
        popupVisible: false
      }
    }
    case DELETE_VIEWED_iNGREDIENT: {
      return {
        ...state,
        viewedIngredient: {}
      }
    }
    default: {
      return state
    }
  }
}