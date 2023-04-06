import { createContext, memo, useState } from 'react';
import itemImage from '../images/item.png';

export const burgerConstructorContext = createContext({});

export const BurgerConstructorProvider = memo(({ children }) => {
  const [ state, setState ] = useState({
    bun: {
      text: 'ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ',
      price: 20,
      image: itemImage, 
      _id: "60d3b41abdacab0026a733c6"
    },
    ingredients: [
      {
            "_id": "60d3b41abdacab0026a733c9",
            "name": "Мясо бессмертных моллюсков Protostomia",
            "type": "main",
            "proteins": 433,
            "fat": 244,
            "carbohydrates": 33,
            "calories": 420,
            "price": 1337,
            "image": "https://code.s3.yandex.net/react/code/meat-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
            "__v": 0
        },
      {
            "_id": "60d3b41abdacab0026a733c9",
            "name": "Мясо бессмертных моллюсков Protostomia",
            "type": "main",
            "proteins": 433,
            "fat": 244,
            "carbohydrates": 33,
            "calories": 420,
            "price": 1337,
            "image": "https://code.s3.yandex.net/react/code/meat-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
            "__v": 0
        },
      {
            "_id": "60d3b41abdacab0026a733c9",
            "name": "Мясо бессмертных моллюсков Protostomia",
            "type": "main",
            "proteins": 433,
            "fat": 244,
            "carbohydrates": 33,
            "calories": 420,
            "price": 1337,
            "image": "https://code.s3.yandex.net/react/code/meat-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
            "__v": 0
        },
    ],
    popupVisible: false,
    totalPrice: 0,
    ingredientsId: '',
    order: 0
  })
  const addBun = bun => { setState(prevState => (
    { 
        ...prevState,
        bun: {
          text: `${bun.text}`,
          price: bun.price,
          image: bun.image,
          _id: bun._id
        } 
      }
    ))
  }
  const postData = () => {
    const url = 'https://norma.nomoreparties.space/api/orders';
    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getIngredientsId())})
      .then(respond => {
        if (respond.ok) {
          return respond.json();
        }
        else { Promise.reject(`Ошибка: ${respond.status}`) }
      })
      .then(object => {
        setState({ ...state, order: object.order })
      })
      .then(() => {
        popupOpen()
      })
      .catch(e => {
        console.log(e);
      })
  }
  const popupClose = () => { setState( prevState => ({ ...prevState, popupVisible: false }))};
  const popupOpen = () => { setState( prevState => ({ ...prevState, popupVisible: true }))};

  const totalPrice = () => {
    const sumBuns = state.bun.price * 2;
    const sumIngredients = state.ingredients.reduce((acc, ingredient) => {
      return ingredient.price + acc
    }, 0)
    return sumIngredients + sumBuns
  }

  const getIngredientsId = () => {
    const array = state.ingredients.map(ingredient => ingredient._id);
    array.push(state.bun._id);
    const ingredientsId = {ingredients: array}
    return ingredientsId
  }

  return (
  <burgerConstructorContext.Provider value={{
    state,
    setState,
    addBun,
    popupClose,
    popupOpen,
    totalPrice,
    postData
  }}>
    { children }
  </burgerConstructorContext.Provider>
  )
})

// BurgerConstructor.propTypes = {
//   bun: ingredientType,
//   ingredient: ingredientType
// }