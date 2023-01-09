import React from 'react';
import AppHeader from '../app-header/app-header.js';
import BurgerIngridients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import styles from '../../styles/app.module.css'
import { sortData } from '../../utils/sort-data.js';

const App = React.memo(() => {
  const [ state, setState ] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  })

  React.useEffect(() => {
    const getData = async() => {
      setState({...state, isLoading: true});
      const url = 'https://norma.nomoreparties.space/api/ingredients';
      const res = await fetch(url);
      const data = await res.json();
      data.success ? setState({ ...state,isLoading: false, data: data.data }) : setState({ hasError: true });
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
          <main className={main}>
            <BurgerIngridients ingridients={sortData(state.data)} />
            <BurgerConstructor />
          </main>
        </>
      }
    </>
  )
})

export default App;