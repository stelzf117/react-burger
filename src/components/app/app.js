import React from 'react';
import AppHeader from '../app-header/app-header.js';
import BurgerIngridients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import styles from '../../styles/app.module.css'
import { data } from '../../utils/data.js';

export default class App extends React.Component {
  sortData = data => {
    const criteria =  ["bun", "sauce", "main"];
    const result = {
      bun: {},
      sauce: {},
      main: {}
    };
    criteria.map((item, i) => {
        result[criteria[i]] = data.filter(item => item.type === criteria[i])
    })
    return result;
  }
  render() {
    const { main } = styles;
    const readyData = this.sortData(data);
    return (
      <>
      <AppHeader />
      <main className={main}>
        <BurgerIngridients {...readyData} />
        <BurgerConstructor {...readyData} />
      </main>
      </>
    )
  }
}
