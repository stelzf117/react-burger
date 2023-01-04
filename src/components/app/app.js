import React from 'react';
import AppHeader from '../app-header/app-header.js';
import BurgerIngridients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import styles from '../../styles/app.module.css'
import { sortData } from '../../utils/sort-data.js';
import { data } from '../../utils/data.js';

const App = React.memo(() => {
  const { main } = styles;
  const readyData = sortData(data);
  return (
    <>
    <AppHeader />
    <main className={main}>
      <BurgerIngridients ingridients={readyData} />
      <BurgerConstructor />
    </main>
    </>
  )
})

export default App;