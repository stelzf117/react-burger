import React from "react";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/ingredient-details.module.css'

const IngredientDetails = React.memo( ({ popupClose, image_large, name, calories, carbohydrates, proteins, fat }) => {
  const { title, inner, header, img, description, list, item, span, close } = styles;
  return (
    <div className={ inner }>
      <div className={ header }>
        <p className={ title }>Детали ингредиента</p>
        <button className={ close } onClick={ popupClose } >
          <CloseIcon type="primary" />
        </button> 
      </div>

      <img className={ img } src={ image_large } alt="" />
      <p className={ description }>{ name }</p>
      <ul className={ list }>
        <li className={ item }>Калории,ккал
          <span className={ span }>{ calories }</span>
        </li>
        <li className={ item }>Белки, г
          <span className={ span }>{ proteins }</span>
        </li>
        <li className={ item }>Жиры, г
          <span className={ span }>{ fat }</span>
        </li>
        <li className={ item }>Углеводы, г
          <span className={ span }>{ carbohydrates }</span>
          </li>
      </ul>
    </div>
  )
})

export default IngredientDetails;