import { 
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENT_INFORMATION,
  DELETE_INGREDIENT_INFORMATION,
  OPEN_POPUP,
  DELETE_VIEWED_iNGREDIENT,
  CLOSE_POPUP,
  SET_ACTIVE_TAB,
  INCREMENT_INGREDIENT_COUNTER,
  DECREMENT_INGREDIENT_COUNTER,
} from "../actions/ingredients";

const initialState = {
  ingredientsRequest: false,
  ingredientsSuccess: false,
  ingredientsFailed: false,
  error: '',
  popupVisible: false,
  viewedIngredient: {},
  tabs: ['one', 'two', 'three'],
  activeTab: 0,
  criteria: ["bun", "sauce", "main"],
  headlines: ['Булки', 'Соусы', 'Начинки'],
  ingredients: {
    bun: [],
    main: [],
    sauce: [],
  },
  quantities: {
    bun: {},
    main: {},
    sauce: {},
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
    case SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: action.activeTab
      }
    }
    case INCREMENT_INGREDIENT_COUNTER: {
      const bunValue = Object.values(state.quantities.bun)[0];
      const { _id, type } = action.ingredient;
      if(type === 'bun' && state.quantities[type][_id] > 0) {
        return {...state}
      } 
      if (type === 'bun' && bunValue !== action._id && bunValue
      ) {
        return {
          ...state,
          quantities: {
            ...state.quantities,
            [type]: {
              [_id]: 1
            }
          }
        }
      }

      const updatedQuantities = {
        ...state.quantities,
        [type]: {
          ...state.quantities[type],
          [_id]: (state.quantities[type][_id] || 0) + 1
        }
      }
      return {
        ...state,
        quantities: updatedQuantities
      }
    }
    case DECREMENT_INGREDIENT_COUNTER: {
      const { _id, type } = action.ingredient;
      const currentValue = state.quantities[type][_id] || 0
      const updatedQuantities = {
        ...state.quantities,
        [type]: {
          ...state.quantities[type],
          [_id]: currentValue > 0 ? currentValue - 1 : 0
        }
      };
      return {
        ...state,
        quantities: updatedQuantities
      }
    }
    default: {
      return state
    }
  }
}