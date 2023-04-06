import { memo, useContext } from 'react';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/burger-constructor.module.css'
// modal
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
// types
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
// context
import { IngredientsContext } from '../../services/appContext';
import { burgerConstructorContext } from '../../services/burgerConstructorContext'


const BurgerConstructor = memo(() => {
  const ingredients = useContext(IngredientsContext);
  const { 
    state,
    addBun,
    popupClose,
    popupOpen } = useContext(burgerConstructorContext);
  const { popupVisible } = state;
  const { wrapper, inner } = styles;


  return (
    <section className={ wrapper }>
     <div className={ inner }>
        <Bun side='top' />
        <Items ingredients={ state.ingredients } />
        <Bun side='bottom' />
        <Order popupOpen={ popupOpen } />
     </div>
    {/* portal */}
      {
        popupVisible && 
        <Modal onClose={ popupClose }>
          <OrderDetails />
        </Modal>
      }
    {/* portal */}
    </section>
  )
})


export default BurgerConstructor;
// ------------------------------


const Bun = memo(({ textSide, side }) => {
  const { state } = useContext(burgerConstructorContext);
  const {bun: { text, price, image }} = state;
  const { bap } = styles;
  return (
    <div className={ bap }>
      <ConstructorElement
        type={ side }
        isLocked={ true }
        text={ `${text} ${textSide ? textSide : 'ㅤ'}` }
        price={ price }
        thumbnail={ image }
      />
    </div>
  )
})

Bun.propTypes = {
  textSide: PropTypes.oneOf(['верхняя булка', 'нижняя булка']),
  side: PropTypes.oneOf(['top', 'bottom']).isRequired
}

const Items = memo( ({ ingredients }) => {
  const { items } = styles;
  return(
    <ul className={items}>
      {
        ingredients && ingredients.map(( item, index ) => (
          <Item key={`${ index }`}
            ingredient={ item }
          />
        ))
      }
  </ul>
  )
})

Items.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType)
}


const Item = memo(({ ingredient }) => {
  const { name, price, image } = ingredient;
  const { item, element } = styles;
  return (
    <li className={ item }>
    <DragIcon />
      <div className={ element }>
      <ConstructorElement
      text={ name }
      price={ price }
      thumbnail={ image }
      />
      </div>
    </li>
  )
})

Item.propTypes = {
  ingredient: ingredientType
}


const Order = memo(() => {
  const { totalPrice, postData } = useContext(burgerConstructorContext);
  const { order, total1, digits } = styles;
  return (
    <div className={ order }>
      <div className={ total1 }>
        <p className={ digits }>{ totalPrice() }</p>
        <CurrencyIcon />
      </div>
      <Button 
        onClick={postData}
        htmlType="button" 
        type="primary" 
        size="large"
      >
        Оформить заказ
      </Button>
    </div>
  )
})