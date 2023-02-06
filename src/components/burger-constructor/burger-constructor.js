import React from 'react';
import PropTypes from 'prop-types';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import itemImage from '../../images/item.png';
import styles from '../../styles/burger-constructor.module.css'
import Modal from '../modal/modal';

const BurgerConstructor = React.memo( props => {
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

BurgerConstructor.propTypes = {
  buns: PropTypes.shape({
    top: PropTypes.shape({
      side: PropTypes.string,
      text: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
    }),
    bottom: PropTypes.shape({
      side: PropTypes.string,
      text: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
    })
  })
}

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

Bun.propTypes = {
  side: PropTypes.string,
  text: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string
}

const Items = React.memo(() => {
  const [ state, setState ] = React.useState({
    items: [
            {text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png'},
            {text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png'},
            {text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png'},
            {text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png'},
            {text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png'},
            {text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png'},
            {text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png'},
           ]
  })
  const { items } = styles;
  return(
    <ul className={items}>
      {state.items.map(( item, index ) => (
        <Item key={`${index}`}
        text={ item.text } 
        price={ item.price } 
        image={ item.image } />
      ))}
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


const Order = React.memo(({ total }) => {
  const [ state, setState ] = React.useState({ popupVisible: false});
  const popupClose = () => { setState({ popupVisible: false })};
  const popupOpen = () => { setState({ popupVisible: true })};
  const { order, total1, digits } = styles;
  return (
    <>
      <div className={order}>
        <div className={total1}>
          <p className={digits}>{total}</p>
          <CurrencyIcon />
        </div>
        <Button onClick={ popupOpen } htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
      {/* {portal} */}
      {state.popupVisible && <Modal popupClose={ popupClose } />}
    </>
  )
})

Order.PropTypes = {
  total: PropTypes.number
}