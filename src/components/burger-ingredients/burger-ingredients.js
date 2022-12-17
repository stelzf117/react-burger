import React from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/burger-ingredients.module.css';


export default class BurgerIngridients extends React.Component {
  render() {
    const { title, wrapper, ingredients } = styles;
    return (
      <section className={ wrapper }>
        <h2 className={title}>Соберите бургер</h2>
        <Tabs />
        <ul className={ingredients}>
          <Items {...this.props.bun} headline='Булки'></Items>
          <Items {...this.props.sauce} headline='Соусы'></Items>
          <Items {...this.props.main} headline='Начинки'></Items>
        </ul>
      </section>
    )
  }
}

class Tabs extends React.Component {
  render() {
    return (
      <div className={styles.tabs}>
        <Tab value="one" active={this.current === 'one'} onClick={this.setCurrent}>Булки</Tab>
        <Tab value="two" active={this.current === 'two'} onClick={this.setCurrent}>Соусы</Tab>
        <Tab value="three" active={this.current === 'three'} onClick={this.setCurrent}>Начинки</Tab>
      </div>
    )
  }
}

class Items extends React.Component {
  render() {
    const data = this.props;
    // console.log(data)
    const { headline, items} = styles;
    return(
      <li>
        <h3 className={headline}>{this.props.headline}</h3>
        <ul className={items}>
          {}
        </ul>
      </li>
    )
  }
}

class Item extends React.Component {
  render() {
    const { item, digits, image, textDigits, itemsDescription } = styles;
    return (
    <li className={item}>
      <Counter count={1} size="default" />
      <img className={image} src={this.props.image} alt={this.props.name} />
      <div className={digits}>
        <p className={textDigits}>20</p>
        <CurrencyIcon />
      </div>
      <p className={itemsDescription}>{this.props.name}</p>
    </li>
    )
  }
}