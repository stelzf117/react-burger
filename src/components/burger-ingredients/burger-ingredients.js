import { memo, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';


const BurgerIngridients = memo(({ ingridients }) => {
  const [ state, setState ] = useState({ popupVisible: false });
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
      <Items {...ingridients} popupOpen={ popupOpen } />

      {/*  portal  */}
        {state.popupVisible &&
        <Modal onClose={ popupClose }>
          <IngredientDetails { ...state.currentIngredient } />
        </Modal>}
      {/*  portal  */}
    </section>
  )
});

BurgerIngridients.propTypes = {
  ingridients: PropTypes.shape({
    bun: PropTypes.arrayOf(PropTypes.object).isRequired,
    main: PropTypes.arrayOf(PropTypes.object).isRequired,
    sauce: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
}

export default BurgerIngridients;
//------------------------------


const Tabs = memo(() => {
  const [ state, setState ] = useState({ current: 'one' });
  const current = state.current;
  const setCurrent = cur => { setState({ current: cur }) };
  return (
    <div className={styles.tabs}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки</Tab>
    </div>
  )
});


const Items = memo( ({ bun, sauce, main, popupOpen }) => {
  const [ state, setState ] = useState({
    ingredients: {
      bun: bun,
      sauce: sauce,
      main: main
    },
    headlines: ['Булки', 'Соусы', 'Начинки']
  });
  const criteria = ["bun", "sauce", "main"];
  const { headline, items, ingredients } = styles;


  return (
    <ul className={ ingredients }>
      {state.headlines.map(( head, index ) => (
        <Fragment key={ index }>
          <h3 className={ headline }>{ head }</h3>
          <ul className={ items }>
            {state.ingredients[criteria[index]].map((ingredient, i) => (
              <Item key={`${ ingredient._id}`}
              popupOpen={ popupOpen }
              { ...ingredient }
               />
            ))}
          </ul>
        </Fragment>
      ))}
    </ul>
  )
});

Items.propTypes = {
  bun: PropTypes.arrayOf(PropTypes.object).isRequired,
  main: PropTypes.arrayOf(PropTypes.object).isRequired,
  sauce: PropTypes.arrayOf(PropTypes.object).isRequired
}


const Item = memo( props => {
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
});

Item.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  popupOpen: PropTypes.func.isRequired
}