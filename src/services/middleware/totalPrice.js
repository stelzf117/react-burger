import { UPDATE_TOTAL_PRICE } from '../actions/constructor';

const sum = (bun, ingredients) => {
  const sumBuns = bun.price * 2;
  const sumIngredients = ingredients.reduce((acc, ingredient) => {
    return ingredient.price + acc
  }, 0)
  return sumIngredients + sumBuns
}

export default function updateTotalPrice() {
  return (dispatch, getState) => {
    const { bun, ingredients } = getState().constructorReducer;
    const totalSum = sum(bun, ingredients);
    dispatch({
      type: UPDATE_TOTAL_PRICE,
      totalPrice: totalSum
    });
  };
}
