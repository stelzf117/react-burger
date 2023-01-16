import React from 'react';
import styles from '../../styles/order-details.module.css'
import doneImage from '../../images/done.jpg'

const OrderDetails = React.memo(props => {
  return (
    <>
      <p className={ styles.digits }>034536</p>
      <p className={ styles.text1 }>идентификатор заказа</p>
      <img className={ styles.done } src={ doneImage } alt='done' />
      <p className={ styles.text2 }>ваш заказ начали готовить</p>
      <p className={ styles.text3 }>дождитесь готовности на орбитальной станции</p>
    </>
  )
})

export default OrderDetails;