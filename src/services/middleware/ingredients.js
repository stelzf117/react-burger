import { 
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED, 
} from "../actions/ingredients";


const sortData = data => {
  const criteria =  ['bun', 'sauce', 'main'];
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
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    const res = await fetch(url)
      .then(respond => {
        if (respond.ok) {
          return respond.json();
        }
        else { Promise.reject(`Ошибка: ${res.status}`) }
      })
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