import { 
    combineReducers,
    createStore,
  } from 'redux';
import { composeWithDevTools  } from 'redux-devtools-extension';

const initialState = {
  receivedIngredients: {
    bun: [],
    main: [],
    sauces: [],
  },
  constructorIngredients: {
    bun: {},
    filling: []
  },
  viewedIngredient: {},
  orderDetails: {}
}

const firstReducer = (state = initialState, action) => {
  switch (action.type) {
    default: 
      return state
  }
}

const rootReducer = combineReducers ({
  firstReducer,
})

export const store = createStore(rootReducer, composeWithDevTools());