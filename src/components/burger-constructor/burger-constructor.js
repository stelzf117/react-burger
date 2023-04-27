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
import { popupOnClose, addIngredient, updateBun, handleItemDelete, changeIngredientIndex, popupOpen } from '../../services/actions/constructor';
import { incrementIngredientCounter, handleItemDecrement } from '../../services/actions/ingredients';
// DND
import { useDrag, useDrop } from 'react-dnd';


const BurgerConstructor = memo(() => {
  const { popupVisible, ingredients } = useSelector(store => store.constructorReducer);
  const dispatch = useDispatch()
  const index = ingredients.length;
  const [{}, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      item.type === 'bun' ? updateBun(item, dispatch) : addIngredient(item, index, dispatch);
      incrementIngredientCounter(item, dispatch);
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
        <Modal onClose={()=> popupOnClose(dispatch) }>
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
  const sortedIngredients = ingredients.sort((a, b) => a.index - b.index);
  const { items } = styles;


  return(
    <ul className={ items }>
      {
        sortedIngredients.map(( ingredient ) => (
          <Item key={`${ ingredient.key }`}
            ingredient={ ingredient }
          />
        ))
      }
  </ul>
  )
})

const Item = memo(({ ingredient }) => {
  const dispatch = useDispatch();


  const [,dragRef] = useDrag({
    type: 'ingredientIndex',
    item: ingredient,
  })
  const [{}, dropRef] = useDrop({
    accept: 'ingredientIndex',
    drop(item) {
      changeIngredientIndex(item, ingredient, dispatch);
    }
  })
  const { name, price, image } = ingredient;
  const { item, element } = styles;


  return (
    <li className={ item } ref={dragRef}>
      <DragIcon />
      <div className={ element } ref={dropRef}>
      <ConstructorElement
        text={ name }
        price={ price }
        thumbnail={ image }
        handleClose={ ()=> {
          handleItemDelete(ingredient, dispatch)
          handleItemDecrement(ingredient, dispatch)
          } }
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
  const isLoading = useSelector(store => store.constructorReducer.orderRequest)
  const dispatch = useDispatch();

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
        onClick={()=> popupOpen(dispatch) }
      >
        {isLoading ? 'загрузка...' :'Оформить заказ'}
      </Button>
    </div>
  )
})