import { 
    combineReducers,
    createStore,
    applyMiddleware,
  } from 'redux';
import { composeWithDevTools  } from 'redux-devtools-extension';
// reducers
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
// middleware
import thunk from 'redux-thunk';

const initialState = {
  constructorIngredients: {
    bun: {},
    filling: []
  },
  viewedIngredient: {},
  orderDetails: {}
}

const middleware = [thunk];
const enhancer = composeWithDevTools(applyMiddleware(...middleware));

const rootReducer = combineReducers ({
  ingredientsReducer,
  constructorReducer
})

export const store = createStore(rootReducer, enhancer);