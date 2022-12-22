import React from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/burger-ingredients.module.css';


export default class BurgerIngridients extends React.Component {
  render() {
    const { title, wrapper } = styles;
    return (
      <section className={ wrapper }>
        <h2 className={title}>Соберите бургер</h2>
        <Tabs />
        <Items {...this.props} />
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
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        bun: props.bun,
        sauce: props.sauce,
        main: props.main
      },
        headlines: ['Булки', 'Соусы', 'Начинки']
      }
    }

  render() {
    const { headline, items, ingredients} = styles;
    const criteria = ["bun", "sauce", "main"];
    return(
      <ul className={ingredients}>
        {this.state.headlines.map((head, index) => (
          <React.Fragment key={index}>
            <h3 className={headline}>{head}</h3>
            <ul className={items}>
              {this.state.ingredients[criteria[index]].map((ingredient, i) => (
                <Item key={`${ingredient._id}-${i}`} {...ingredient} />
              ))}
            </ul>
          </React.Fragment>
        ))}
      </ul>
    )
  }
}

class Item extends React.Component {
  render() {
    const { item, digits, img, textDigits, itemsDescription } = styles;
    const { image, name, price } = this.props;
    return (
    <li className={item}>
      <img className={img} src={image} alt={name} />
      <div className={digits}>
        <p className={textDigits}>{price}</p>
        <CurrencyIcon />
      </div>
      <p className={itemsDescription}>{name}</p>
    </li>
    )
  }
}