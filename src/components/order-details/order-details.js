import { memo } from 'react';
import styles from '../../styles/order-details.module.css'
import doneImage from '../../images/done.jpg'
import PropTypes from 'prop-types';

const OrderDetails = memo(() => {
  const { inner, text1, text2, text3, done, digits } = styles;
  return (
    <div className={ inner }>
      <p className={ digits }>034536</p>
      <p className={ text1 }>идентификатор заказа</p>
      <img className={ done } src={ doneImage } alt='done' />
      <p className={ text2 }>ваш заказ начали готовить</p>
      <p className={ text3 }>дождитесь готовности на орбитальной станции</p>
    </div>
  )
})

export default OrderDetails;