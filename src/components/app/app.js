import { memo, useEffect, useState } from 'react';
import BurgerIngridients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import AppHeader from '../app-header/app-header.js';
import { sortData } from '../../utils/sort-data.js';
import styles from '../../styles/app.module.css';
// context
import { IngredientsContext } from '../../services/appContext';
import { BurgerConstructorProvider } from '../../services/burgerConstructorContext';


// redux -------------------------------------------------------------------
// import { compose, createStore, applyMiddleware } from 'redux';
// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose; 

// const enhancer = composeEnhancers();
// const store = createStore(rootReducer, enhancer); 
// redux --------------------------------------------------------------------

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
          const sortedData = sortData(object.data);
          setState({ ...state, isLoading: false, data: sortedData })
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
        state.data.length != [] &&
        <>
          <AppHeader />
          <main className={ main }>
            <BurgerIngridients ingredients={ state.data } />
            <IngredientsContext.Provider value={ state.data }>
              <BurgerConstructorProvider>
                <BurgerConstructor />
              </BurgerConstructorProvider>
            </IngredientsContext.Provider>
          </main>
        </>
      }
    </>
  )
});

export default App;