import { memo } from "react";
import styles from '../../styles/ingredient-details.module.css'
import { ingredientType } from "../../utils/types";
import { useSelector } from "react-redux";

const IngredientDetails = memo(() => {
  const { image_large, name, calories, carbohydrates, proteins, fat } = useSelector(store => store.ingredientsReducer.viewedIngredient);
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

export default IngredientDetails;