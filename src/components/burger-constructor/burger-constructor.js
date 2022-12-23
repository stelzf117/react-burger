import React from 'react';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import itemImage from '../../images/item.png';
import styles from '../../styles/burger-constructor.module.css'

export default class BurgerConstructor extends React.Component {
  state = {
    buns: {
      top: {
        side: 'top',
        text: 'Краторная булка N-200i (верх)',
        price: 200,
        image: itemImage
      },
      bottom: {
        side: 'bottom',
        text: 'Краторная булка N-200i (низ)',
        price: 200,
        image: itemImage
      } 
    }
  }
  render() {
    const { wrapper, inner } = styles;
    return(
     <section className={wrapper}>
      <div className={inner}>
        <Bun {...this.state.buns.top} />
        <Items />
        <Bun {...this.state.buns.bottom} />
        <Order total={50000} />
      </div>
     </section>
    )
  }
}

class Bun extends React.Component {
  render() {
    const { bun } = styles;
    return (
      <div className={bun}>
        <ConstructorElement
        type={this.props.side}
        isLocked={true}
        text={this.props.text}
        price={this.props.price}
        thumbnail={this.props.image}
        />
      </div>
    )
  }
}

class Items extends React.Component {
  state = {
    items: {}
  }
  addItem() {
    this.setState(prevState => {
      // items: [...prevState]
    })
  }
  render() {
    const { items } = styles;
    return (
      <ul className={items}>
        <Item text='Мясо бессмертных моллюсков Protostomia' price={1337} image={'https://code.s3.yandex.net/react/code/meat-02.png'} />
        <Item text='Мясо бессмертных моллюсков Protostomia' price={1337} image={'https://code.s3.yandex.net/react/code/meat-02.png'} />
        <Item text='Мясо бессмертных моллюсков Protostomia' price={1337} image={'https://code.s3.yandex.net/react/code/meat-02.png'} />
        <Item text='Мясо бессмертных моллюсков Protostomia' price={1337} image={'https://code.s3.yandex.net/react/code/meat-02.png'} />
        <Item text='Мясо бессмертных моллюсков Protostomia' price={1337} image={'https://code.s3.yandex.net/react/code/meat-02.png'} />
        <Item text='Мясо бессмертных моллюсков Protostomia' price={1337} image={'https://code.s3.yandex.net/react/code/meat-02.png'} />
        <Item text='Мясо бессмертных моллюсков Protostomia' price={1337} image={'https://code.s3.yandex.net/react/code/meat-02.png'} />
      </ul>
    )
  }
}

class Item extends React.Component {
  render() {
    const { item, element } = styles;
    return (
      <li className={item}>
          <DragIcon />
        <div className={element}>
          <ConstructorElement
            text={this.props.text}
            price={this.props.price}
            thumbnail={this.props.image}
          />
        </div>
      </li>
    )
  }
}


class Order extends React.Component {
  render() {
    const { order, total, digits } = styles;
    return(
      <div className={order}>
      <div className={total}>
        <p className={digits}>{this.props.total}</p>
        <CurrencyIcon />
      </div>
      <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
    </div>
    )
  }
}
