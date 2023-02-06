import React from 'react';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';


const BurgerIngridients = React.memo( props => {
  const [ state, setState ] = React.useState({ popupVisible: false });
  const popupClose = () => setState({ popupVisible: false });
  const popupOpen = ingredient => setState(() => {
    return { 
      currentIngredient: {
        name: ingredient.name,
        image_large: ingredient.image_large,
        fat: ingredient.fat,
        proteins: ingredient.proteins,
        calories: ingredient.calories,
        carbohydrates: ingredient.carbohydrates
      }, 
      popupVisible: true }
  });
  const { title, wrapper } = styles;


  return (
    <section className={ wrapper }>
      <h2 className={title}>Соберите бургер</h2>
      <Tabs />
      <Items {...props.ingridients} popupOpen={ popupOpen } />

      {/* { portal } */}
        {state.popupVisible &&
        <Modal 
          title='Детали ингредиента'
          onClose={ popupClose }
        >
          <IngredientDetails currentIngredient={ state.currentIngredient } />
        </Modal>}
      {/* { portal } */}
    </section>
  )
})

BurgerIngridients.propTypes = {
  ingridients: PropTypes.shape({
    bun: PropTypes.arrayOf(PropTypes.object),
    main: PropTypes.arrayOf(PropTypes.object),
    sauce: PropTypes.arrayOf(PropTypes.object)
  })
};

export default BurgerIngridients;
//------------------------------


const Tabs = React.memo(() => {
  const [ state, setState ] = React.useState({ current: 'one' });
  const current = state.current;
  const setCurrent = cur => { setState({ current: cur }) };
  return (
    <div className={styles.tabs}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки</Tab>
    </div>
  )
})


const Items = React.memo( props => {
  const [ state, setState ] = React.useState({
    ingredients: {
      bun: props.bun,
      sauce: props.sauce,
      main: props.main
    },
    headlines: ['Булки', 'Соусы', 'Начинки']
  });
  const criteria = ["bun", "sauce", "main"];
  const { headline, items, ingredients } = styles;


  return (
    <ul className={ ingredients }>
      {state.headlines.map(( head, index ) => (
        <React.Fragment key={ index }>
          <h3 className={ headline }>{ head }</h3>
          <ul className={ items }>
            {state.ingredients[criteria[index]].map((ingredient, i) => (
              <Item key={`${ ingredient._id}`}
              popupOpen={ props.popupOpen }
              { ...ingredient }
               />
            ))}
          </ul>
        </React.Fragment>
      ))}
    </ul>
  )
})

Items.propTypes = {
    bun: PropTypes.arrayOf(PropTypes.object),
    main: PropTypes.arrayOf(PropTypes.object),
    sauce: PropTypes.arrayOf(PropTypes.object)
};


const Item = React.memo( props => {
  const { image, name, price, popupOpen } = props;
  const { item, digits, img, textDigits, itemsDescription } = styles;
  return (
    <li className={ item } onClick={() => { popupOpen(props) }}>
      <img className={ img } src={ image } alt={ name } />
      <div className={ digits }>
        <p className={ textDigits }>{ price }</p>
        <CurrencyIcon />
      </div>
      <p className={ itemsDescription }>{ name }</p>
    </li>
  )
})

Item.propTypes = {
  image: PropTypes.string, 
  name: PropTypes.string, 
  price: PropTypes.number
};