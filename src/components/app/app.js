import { memo, useEffect, useState } from 'react';
import BurgerIngridients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import AppHeader from '../app-header/app-header.js';
import { sortData } from '../../utils/sort-data.js';
import styles from '../../styles/app.module.css';


const App = memo(() => {
  const [ state, setState ] = useState({
    isLoading: false,
    hasError: false,
    data: []
  })
  useEffect(() => {
    const getData = async() => {
      setState({ ...state, isLoading: true });
      const url = 'https://norma.nomoreparties.space/api/ingredients';
      const res = await fetch(url)
        .then(respond => {
          if (respond.ok) {
            return respond.json();
          }
          else { Promise.reject(`Ошибка: ${res.status}`) }
        })
        .then(object => {
          setState({ ...state, isLoading: false, data: object.data })
        })
        .catch(e => {
          console.log(e);
          setState({ isLoading: false, hasError: true });
        })
    }
    getData()
  },
    [ ]
  )
  const { main } = styles;
  return (
    <>
      { state.hasError && 'произошла ошибка' }
      {
        !state.isLoading &&
        !state.hasError &&
        state.data.length &&
        <>
          <AppHeader />
          <main className={ main }>
            <BurgerIngridients ingredients={ sortData(state.data) } />
            <BurgerConstructor />
          </main>
        </>
      }
    </>
  )
});

export default App;