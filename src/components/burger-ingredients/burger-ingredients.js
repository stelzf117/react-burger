import React from 'react';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/burger-ingredients.module.css';
import Modal from '../modal/modal';


const BurgerIngridients = React.memo(props => {
  const { title, wrapper } = styles;
  return (
    <section className={ wrapper }>
      <h2 className={title}>Соберите бургер</h2>
      <Tabs />
      <Items {...props.ingridients} />
    </section>
  )
})


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


const Items = React.memo(props => {
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


  return(
    <ul className={ ingredients }>
      {state.headlines.map(( head, index ) => (
        <React.Fragment key={ index }>
          <h3 className={ headline }>{ head }</h3>
          <ul className={ items }>
            {state.ingredients[criteria[index]].map((ingredient, i) => (
              <Item key={`${ ingredient._id} -${i}`} { ...ingredient } />
            ))}
          </ul>
        </React.Fragment>
      ))}
    </ul>
  )
})


const Item = React.memo(props => {
  const { image, name, price } = props;
  const [ state, setState ] = React.useState({ popupVisible: false });
  const popupClose = () => { setState({ popupVisible: false })};
  const popupOpen = () => { setState({ popupVisible: true })};
  const { item, digits, img, textDigits, itemsDescription } = styles;
  return (
    <>
      <li className={ item } onClick={ popupOpen }>
        <img className={ img } src={ image } alt={ name } />
        <div className={ digits }>
          <p className={ textDigits }>{ price }</p>
          <CurrencyIcon />
        </div>
        <p className={ itemsDescription }>{ name }</p>
      </li>
      {/* {portal} */}
      {state.popupVisible && <Modal
        popupClose={ popupClose } 
        popup='ingredient'
        { ...props } 
      />}
    </>
    )
})