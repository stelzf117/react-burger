import { memo, useState } from 'react';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/burger-constructor.module.css'
import OrderDetails from '../order-details/order-details';
import itemImage from '../../images/item.png';
import Modal from '../modal/modal';
import { ingredientType } from '../../utils/types';
import PropTypes from 'prop-types';


const BurgerConstructor = memo(({ bun, ingredient }) => {
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
  });
  const popupClose = () => { setState( prevState => ({ ...prevState, popupVisible: false }))};
  const popupOpen = () => { setState( prevState => ({ ...prevState, popupVisible: true }))};
  const { wrapper, inner } = styles;


  return (
    <section className={ wrapper }>
     <div className={ inner }>
       <Bun bun={ state.buns.top } />
       <Items />
       <Bun bun={ state.buns.bottom } />
       <Order popupOpen={ popupOpen } total={ 0 } />
     </div>
    {/* portal */}
      {
        state.popupVisible && 
        <Modal onClose={ popupClose }>
          <OrderDetails />
        </Modal>
      }
    {/* portal */}
    </section>
  )
})

BurgerConstructor.propTypes = {
  bun: ingredientType,
  ingredient: ingredientType
}

export default BurgerConstructor;
// ------------------------------


const Bun = memo(({ bun }) => {
  const { side, text, price, image } = bun;
  const { bap } = styles;
  return (
    <div className={ bap }>
      <ConstructorElement
        type={ side }
        isLocked={ true }
        text={ text }
        price={ price }
        thumbnail={ image }
      />
    </div>
  )
})

// Bun.propTypes = {
//   bun: ingredientType
// }

const Items = memo( ({ ingredient }) => {
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
      {
        state.items.map(( item, index ) => (
          <Item key={`${ index }`}
          ingredient={ item }
          />
        ))
      }
  </ul>
  )
})

Items.propTypes = {
  ingredient: ingredientType
}


const Item = memo(({ ingredient }) => {
  const { text, price, image } = ingredient;
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

// Item.propTypes = {
//   ingredient: ingredientType
// }


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