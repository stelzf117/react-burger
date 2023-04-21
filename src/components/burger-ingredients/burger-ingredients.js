import { memo, useState, Fragment, useEffect} from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientType } from '../../utils/types';
import PropTypes from 'prop-types';
// redux
import { useDispatch, useSelector } from 'react-redux';
import getIngredients from '../../services/middleware/ingredients';
import { GET_INGREDIENT_INFORMATION, OPEN_POPUP, CLOSE_POPUP, DELETE_VIEWED_iNGREDIENT } from '../../services/actions/ingredients';


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
        <Items
          ingredients={ ingredients }
        />

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


const Items = memo(() => {
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients);
  const [ state, setState ] = useState({ headlines: ['Булки', 'Соусы', 'Начинки'] });
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
                ingredients[criteria[index]].map( ingredient => (
                  <Item key={`${ ingredient._id}`}
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