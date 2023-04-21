import { memo, useEffect, useState } from 'react';
import BurgerIngridients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import AppHeader from '../app-header/app-header.js';
import styles from '../../styles/app.module.css';
// store
import { useSelector } from 'react-redux';


const App = memo(() => {
  const ingredientsFailed = useSelector(store => store.ingredientsReducer.ingredientsFailed)

  const { main } = styles;
  return (
    <>
      { ingredientsFailed ? ('произошла ошибка') : (
        <>
          <AppHeader />
          <main className={ main }>
            <BurgerIngridients />
            <BurgerConstructor />
          </main>
        </>
      )}
    </>
  )
});

export default App;