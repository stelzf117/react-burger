import { memo, useEffect } from 'react';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/burger-constructor.module.css'
// modal
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
// types
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
// redux
import { useSelector, useDispatch } from 'react-redux';
import updateTotalPrice from '../../services/middleware/totalPrice';
import getOrderDetails from '../../services/middleware/order-details'
import { CLOSE_POPUP_ORDER, DELETE_ORDER_NUMBER } from '../../services/actions/constructor';

const BurgerConstructor = memo(() => {
  const { popupVisible } = useSelector(store => store.constructorReducer);
  const dispatch = useDispatch()
  const popupOnClose = () => {
    dispatch({ type: CLOSE_POPUP_ORDER });
    dispatch({ type: DELETE_ORDER_NUMBER });
  }
  const { wrapper, inner } = styles;


  return (
    <section className={ wrapper }>
     <div className={ inner }>
        <Bun side='top' />
        <Items />
        <Bun side='bottom' />
        <Order />
     </div>
    {/* portal */}
      {
        popupVisible &&
        <Modal onClose={ popupOnClose }>
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
  const { text, price, image } = useSelector(store => store.constructorReducer.bun)
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

const Items = memo(() => {
  const ingredients = useSelector(store => store.constructorReducer.ingredients);
  const { items } = styles;
  return(
    <ul className={items}>
      {
         ingredients.map(( item, index ) => (
          <Item key={`${ index }`}
            ingredient={ item }
          />
        ))
      }
  </ul>
  )
})

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
  const { totalPrice } = useSelector(store => store.constructorReducer);
  const dispatch = useDispatch();
  const popupOpen = () => dispatch(getOrderDetails());

  useEffect(() => {
    dispatch(updateTotalPrice())
  },
  [ dispatch ] )

  const { order, total1, digits } = styles;
  return (
    <div className={ order }>
      <div className={ total1 }>
        <p className={ digits }>{ totalPrice }</p>
        <CurrencyIcon />
      </div>
      <Button 
        htmlType="button"
        type="primary"
        size="large"
        onClick={ popupOpen }
      >
        Оформить заказ
      </Button>
    </div>
  )
})