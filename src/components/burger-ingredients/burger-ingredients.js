import { memo, useState, Fragment, useEffect, useRef} from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientType } from '../../utils/types';
// redux
import { useDispatch, useSelector } from 'react-redux';
import getIngredients from '../../services/middleware/ingredients';
import { GET_INGREDIENT_INFORMATION, OPEN_POPUP, CLOSE_POPUP, DELETE_VIEWED_iNGREDIENT, SET_ACTIVE_TAB } from '../../services/actions/ingredients';


const BurgerIngridients = memo(() => {
  const { ingredients, ingredientsSuccess, viewedIngredient } = useSelector(store => store.ingredientsReducer);
  const dispatch = useDispatch();
  const { popupVisible } = useSelector(store => store.ingredientsReducer);
  const popupOnClose = () => { 
    dispatch({ type: CLOSE_POPUP })
    dispatch({ type: DELETE_VIEWED_iNGREDIENT })
  }

  useEffect(() => {
    dispatch(getIngredients());
  },
  [ dispatch ])
  const { title, wrapper } = styles;


  return (
      ingredientsSuccess &&
      <section className={ wrapper }>
        <h2 className={ title }>Соберите бургер</h2>
        <Tabs />
        <Items/>

        {/* portal */}
        {popupVisible && (
          <Modal onClose={ popupOnClose }>
            <IngredientDetails />
          </Modal>
        )}
        {/* portal */}

      </section>
  );
});


export default BurgerIngridients;
//------------------------------


const Tabs = memo(() => {
  const { activeTab, tabs } = useSelector(store => store.ingredientsReducer);
  const current = tabs[activeTab];
  const dispatch = useDispatch();
  const setActiveTab = index => dispatch({ type: SET_ACTIVE_TAB, activeTab: index });

  return (
    <div className={styles.tabs}>
      <Tab value="one" active={current === 'one'} onClick={() => setActiveTab(0)}>Булки</Tab>
      <Tab value="two" active={current === 'two'} onClick={ () => setActiveTab(1) }>Соусы</Tab>
      <Tab value="three" active={current === 'three'} onClick={ () => setActiveTab(2) }>Начинки</Tab>
    </div>
  )
});


const Items = memo(() => {
  const { ingredients, headlines, criteria, activeTab } = useSelector(store => store.ingredientsReducer);
  const dispatch = useDispatch();
  const setActiveTab = index => dispatch({ type: SET_ACTIVE_TAB, activeTab: index });

  const containerRef = useRef(null);
  const handleScroll = () => {
    const headlines = containerRef.current.querySelectorAll('[data-test="burger-ingredients-headline"]');
    const distances = Array.from(headlines).map(headline => {
      return Math.abs(headline.getBoundingClientRect().top)
    });
    const minDistance = Math.min(...distances);
    const index = distances.indexOf(minDistance);
    if (activeTab !== index) {
      setActiveTab(index);
    }
  };
  const { headline, items, components } = styles;

  return (
    <ul className={ components } ref={ containerRef } onScroll={ handleScroll }>
      {
        headlines.map(( head, index ) => (
          <li key={ index } data-test="burger-ingredients-headline">
            <h3 className={ headline }>{ head }</h3>
            <ul className={ items }>
              {
                ingredients[criteria[index]].map( ingredient => (
                  <Item key={`${ ingredient._id}`}
                    ingredient={ ingredient }
                  />
                ))
              }
            </ul>
          </li>
        ))
      }
    </ul>
  )
});


const Item = memo(({ ingredient }) => {
  const { image, name, price } = ingredient;
  const { item, digits, img, textDigits, itemsDescription } = styles;
  const dispatch = useDispatch();
  const getIngredientInformation = () => {
    dispatch({
      type: GET_INGREDIENT_INFORMATION,
      ingredient: ingredient
    });
    dispatch({
      type: OPEN_POPUP
    })
  };


  return (
    <li className={ item } onClick={() => { getIngredientInformation() }}>
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
};