import { memo, useState } from 'react';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/burger-constructor.module.css'
import OrderDetails from '../order-details/order-details';
import itemImage from '../../images/item.png';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';


const BurgerConstructor = memo( props => {
  const [ state, setState ] = useState({
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
    },
    popupVisible: false
  })
  const popupClose = () => { setState(prevState => ({ ...prevState, popupVisible: false }))};
  const popupOpen = () => { setState(prevState => ({ ...prevState, popupVisible: true }))};
  const { wrapper, inner } = styles;


  return (
    <section className={wrapper}>
     <div className={inner}>
       <Bun {...state.buns.top} />
       <Items />
       <Bun {...state.buns.bottom} />
       <Order popupOpen={ popupOpen } total={ 50000 } />
     </div>
    {/* portal */}
      {state.popupVisible && 
      <Modal onClose={ popupClose }>
        <OrderDetails />
      </Modal>}
    {/* portal */}
    </section>
  )
})

BurgerConstructor.propTypes = {
  buns: PropTypes.shape({
    top: ingredientType,
    bottom: ingredientType
  })
}

export default BurgerConstructor;
// ------------------------------


const Bun = memo(({ side, text, price, image }) => {
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
  side: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
}


const Items = memo( ({ text, price, image }) => {
  const [ state, setState ] = useState({
    items: [
            { text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png' },
            { text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png' },
            { text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png' },
            { text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png' },
            { text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png' },
            { text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png' },
            { text: 'Мясо бессмертных моллюсков Protostomia', price: 1337, image: 'https://code.s3.yandex.net/react/code/meat-02.png' }
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

Items.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
}


const Item = memo(({ text, price, image }) => {
  const { item, element } = styles;
  return (
    <li className={ item }>
    <DragIcon />
      <div className={ element }>
      <ConstructorElement
      text={ text }
      price={ price }
      thumbnail={ image }
      />
      </div>
    </li>
  )
})

Item.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
}


const Order = memo(({ total, popupOpen }) => {
  const { order, total1, digits } = styles;
  return (
    <div className={ order }>
      <div className={ total1 }>
        <p className={ digits }>{ total }</p>
        <CurrencyIcon />
      </div>
      <Button onClick={ popupOpen } htmlType="button" type="primary" size="large">Оформить заказ</Button>
    </div>
  )
})

Order.propTypes = {
  total: PropTypes.number.isRequired,
  popupOpen: PropTypes.func.isRequired
}