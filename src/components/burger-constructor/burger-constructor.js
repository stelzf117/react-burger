import { memo, useEffect, useRef } from 'react';
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
import { CLOSE_POPUP_ORDER, DELETE_ORDER_NUMBER, ADD_INGREDIENT, UPDATE_BUN, DELETE_INGREDIENT } from '../../services/actions/constructor';
import { INCREMENT_INGREDIENT_COUNTER, DECREMENT_INGREDIENT_COUNTER } from '../../services/actions/ingredients';
// DND
import { useDrop } from 'react-dnd';

const BurgerConstructor = memo(() => {
  const { popupVisible, ingredients } = useSelector(store => store.constructorReducer);
  const dispatch = useDispatch()
  const popupOnClose = () => {
    dispatch({ type: CLOSE_POPUP_ORDER });
    dispatch({ type: DELETE_ORDER_NUMBER });
  }
  const index = ingredients.length;
  const addIngredient = item => dispatch({ type: ADD_INGREDIENT, ingredient: item, index: index })
  const updateBun = item => dispatch({ type: UPDATE_BUN, bun: item })
  const incrementIngredientCounter = item => dispatch({ type: INCREMENT_INGREDIENT_COUNTER, ingredient: item });
  const [{}, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      item.type === 'bun' ? updateBun(item) : addIngredient(item);
      incrementIngredientCounter(item);
    }
  })
  const { wrapper, inner } = styles;


  return (
    <section className={ wrapper }>
     <div className={ inner } ref={ dropRef }>
        <Bun side='top' textSide='(верх)' />
        <Items />
        <Bun side='bottom' textSide='(низ)' />
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
  const { name, price, image } = useSelector(store => store.constructorReducer.bun)
  const { bap } = styles;
  return (
    <div className={ bap }>
      <ConstructorElement
        type={ side }
        isLocked={ true }
        text={ `${name} ${textSide ? textSide : 'ㅤ'}` }
        price={ price }
        thumbnail={ image }
      />
    </div>
  )
})

Bun.propTypes = {
  textSide: PropTypes.oneOf(['(верх)', '(низ)']),
  side: PropTypes.oneOf(['top', 'bottom']).isRequired
}

const Items = memo(() => {
  const ingredients = useSelector(store => store.constructorReducer.ingredients);
  const { items } = styles;
  return(
    <ul className={items}>
      {
         ingredients.map(( ingredient, index ) => (
          <Item key={`${ index }`}
            ingredient={ ingredient }
          />
        ))
      }
  </ul>
  )
})

const Item = memo(({ ingredient }) => {
  const dispatch = useDispatch();
  const handleDelete= () => {
    dispatch({ type: DECREMENT_INGREDIENT_COUNTER, ingredient: ingredient })
    dispatch({ type: DELETE_INGREDIENT, ingredient: ingredient })
  }

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
        handleClose={ handleDelete }
      />
      </div>
    </li>
  )
})

Item.propTypes = {
  ingredient: ingredientType
}


const Order = memo(() => {
  const { totalPrice, ingredients, bun } = useSelector(store => store.constructorReducer);
  const dispatch = useDispatch();
  const popupOpen = () => dispatch(getOrderDetails());

  useEffect(() => {
    dispatch(updateTotalPrice())
  },
  [ ingredients, bun ] )

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