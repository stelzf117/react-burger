import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/order-details.module.css'
import doneImage from '../../images/done.jpg'

const OrderDetails = React.memo(({ popupClose }) => {
  const { inner, text1, text2, text3, done, digits, close } = styles;
  return (
    <>
      <button className={ close } onClick={ popupClose } >
        <CloseIcon type="primary" />
      </button>
    <div className={ inner }>
      <p className={ digits }>034536</p>
      <p className={ text1 }>идентификатор заказа</p>
      <img className={ done } src={ doneImage } alt='done' />
      <p className={ text2 }>ваш заказ начали готовить</p>
      <p className={ text3 }>дождитесь готовности на орбитальной станции</p>
    </div>
    </>
  )
})

export default OrderDetails;