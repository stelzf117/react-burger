import { memo, useEffect, useRef} from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientType } from '../../utils/types';
// redux
import { useDispatch, useSelector } from 'react-redux';
import getIngredients from '../../services/middleware/ingredients';
import { getIngredientInformation, popupOnClose, setActiveTab } from '../../services/actions/ingredients';
// DND
import { useDrag } from 'react-dnd';


const BurgerIngridients = memo(() => {
  const { ingredientsSuccess } = useSelector(store => store.ingredientsReducer);
  const { popupVisible } = useSelector(store => store.ingredientsReducer);
  const dispatch = useDispatch();


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
          <Modal onClose={()=> popupOnClose(dispatch) }>
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
  

  return (
    <div className={styles.tabs}>
      <Tab value="one" active={current === 'one'} onClick={() => setActiveTab(dispatch, 0)}>Булки</Tab>
      <Tab value="two" active={current === 'two'} onClick={ () => setActiveTab(dispatch, 1) }>Соусы</Tab>
      <Tab value="three" active={current === 'three'} onClick={ () => setActiveTab(dispatch, 2) }>Начинки</Tab>
    </div>
  )
});


const Items = memo(() => {
  // store
  const { ingredients, headlines, criteria, activeTab } = useSelector(store => store.ingredientsReducer);
  // scroll
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const handleScroll = () => {
    const headlines = containerRef.current.querySelectorAll('[data-test="burger-ingredients-headline"]');
    const distances = Array.from(headlines).map(headline => {
      return Math.abs(headline.getBoundingClientRect().top)
    });
    const minDistance = Math.min(...distances);
    const index = distances.indexOf(minDistance);
    if (activeTab !== index) {
      setActiveTab(dispatch, index);
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
  const countIngredient = useSelector(store => store.ingredientsReducer.quantities[ingredient.type][ingredient._id])
  const { image, name, price } = ingredient;
  const { item, digits, img, textDigits, itemsDescription } = styles;
  const dispatch = useDispatch();
  const [,dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient
  })


  return (
    <li className={ item } onClick={()=> getIngredientInformation(dispatch, ingredient) } ref={dragRef}>
      {countIngredient ? <Counter count={ countIngredient } /> : null}
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