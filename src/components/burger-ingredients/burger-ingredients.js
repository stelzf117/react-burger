import { memo, useState, Fragment } from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientsType, ingredientType } from '../../utils/types';
import PropTypes from 'prop-types';


const BurgerIngridients = memo(({ ingredients }) => {
  const [ state, setState ] = useState({ popupVisible: false });
  const popupClose = () => setState({ popupVisible: false });
  const popupOpen = ingredient => setState(() => {
    return { 
      currentIngredient: { ...ingredient },
      popupVisible: true 
    }
  });
  const { title, wrapper } = styles;

  return (
    <section className={ wrapper }>
      <h2 className={ title }>Соберите бургер</h2>
      <Tabs />
      <Items 
        ingredients={ ingredients }
        popupOpen={ popupOpen } 
      />

      {/*  portal  */}
        {
          state.popupVisible &&
          <Modal onClose={ popupClose }>
            <IngredientDetails ingredient={ state.currentIngredient } />
          </Modal>
        }
      {/*  portal  */}
    </section>
  )
});

BurgerIngridients.propTypes = {
  ingredients: ingredientsType.isRequired
};


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


const Items = memo(({ ingredients, popupOpen }) => {
  const [ state, setState ] = useState({
    ingredients: { 
      bun: ingredients.bun,
      main: ingredients.main,
      sauce: ingredients.sauce
     },
    headlines: ['Булки', 'Соусы', 'Начинки']
  });
  const criteria = ["bun", "sauce", "main"];
  const { headline, items, components } = styles;


  return (
    <ul className={ components }>
      {
        state.headlines.map(( head, index ) => (
          <Fragment key={ index }>
            <h3 className={ headline }>{ head }</h3>
            <ul className={ items }>
              {
                state.ingredients[criteria[index]].map( ingredient => (
                  <Item key={`${ ingredient._id}`}
                    popupOpen={ popupOpen }
                    ingredient={ ingredient }
                  />
                ))
              }
            </ul>
          </Fragment>
        ))
      }
    </ul>
  )
});

Items.propTypes = {
  ingredients: ingredientsType.isRequired,
  popupOpen: PropTypes.func.isRequired
};


const Item = memo(({ ingredient, popupOpen }) => {
  const { image, name, price } = ingredient;
  const { item, digits, img, textDigits, itemsDescription } = styles;
  return (
    <li className={ item } onClick={() => { popupOpen(ingredient) }}>
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
  ingredient: ingredientType.isRequired,
  popupOpen: PropTypes.func.isRequired
};