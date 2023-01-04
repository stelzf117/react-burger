import React from 'react';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import itemImage from '../../images/item.png';
import styles from '../../styles/burger-constructor.module.css'

const BurgerConstructor = React.memo(props => {
  const [ state, setState ] = React.useState({
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
  })
  const { wrapper, inner } = styles;

  return (
    <section className={wrapper}>
     <div className={inner}>
       <Bun {...state.buns.top} />
       <Items />
       <Bun {...state.buns.bottom} />
       <Order total={50000} />
     </div>
    </section>
  )
})

export default BurgerConstructor;
// ------------------------------

const Bun = React.memo(({ side, text, price, image }) => {
  const { bun } = styles;
  return (
    <div className={ bun }>
      <ConstructorElement
      type={side}
      isLocked={true}
      text={text}
      price={price}
      thumbnail={image}
      />
    </div>
  )
})

const Items = React.memo(() => {
  const [ state, setState ] = React.useState({items: {}})
  const { items } = styles;
  return(
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
})

const Item = React.memo(({ text, price, image }) => {
  const { item, element } = styles;
  return (
    <li className={item}>
    <DragIcon />
      <div className={element}>
      <ConstructorElement
      text={text}
      price={price}
      thumbnail={image}
      />
      </div>
    </li>
  )
})

const Order = React.memo(props => {
  const { order, total, digits } = styles;
  return (
    <div className={order}>
      <div className={total}>
        <p className={digits}>{props.total}</p>
        <CurrencyIcon />
      </div>
      <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
    </div>
  )
})