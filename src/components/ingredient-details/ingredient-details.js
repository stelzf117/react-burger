import { memo } from "react";
import PropTypes from 'prop-types';
import styles from '../../styles/ingredient-details.module.css'

const IngredientDetails = memo( ({ image_large, name, calories, carbohydrates, proteins, fat }) => {
  const { title, inner, header, img, description, list, item, span } = styles;
  return (
    <div className={ inner }>
      <div className={ header }>
        <p className={ title }>Детали ингредиента</p>
      </div>

      <img className={ img } src={ image_large } alt={ name } />
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

IngredientDetails.propTypes = {
  image_large: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired
}

export default IngredientDetails;