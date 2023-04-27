import { 
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED, 
} from "../actions/ingredients";
import { BASE_URL } from '../../utils/constants';
import { checkResponse } from '../../utils/checkResponse'


const sortData = data => {
  const criteria = ['bun', 'sauce', 'main'];
  const result = {
    bun: [],
    sauce: [],
    main: []
  };

  for(let i = 0; i < 3 ; i++){
    result[criteria[i]] = data.filter(item => item.type === criteria[i])
  }
  return result;
}

export default function getIngredients() {
  return async dispatch => {
    dispatch({
      type: GET_INGREDIENTS
    })
    const url = `${BASE_URL}/ingredients`;
    const res = await fetch(url)
      .then(respond => checkResponse(respond))
      .then(object => {
        const sortedData = sortData(object.data);
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: sortedData
        })
      })
      .catch(e => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error: e
        })
      })
  }
};