import React from 'react';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import itemImage from '../../images/item.png';
import styles from '../../styles/burger-constructor.module.css'

export default class BurgerConstructor extends React.Component {
  render() {
    const { wrapper, inner, item, drag, element, order, total, digits, icon, button } = styles;
    return(
      <section className={wrapper}>
        <ul className={inner}>

          <li class={item}>
            <div className={element}>
              <ConstructorElement 
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={itemImage}
              />
            </div>
          </li>

          <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

           <li class={item}>
          <div className={drag}>
            <DragIcon />
          </div>
          <div className={element}>
            <ConstructorElement
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

          <li class={item}>
          <div className={element}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={itemImage}
            />
          </div>
           </li>

        </ul>

        {/* order, total, digits, icon, button */}

        <div className={order}>
          <div className={total}>
            <p className={digits}>610</p>
            <CurrencyIcon />
          </div>
          <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
        </div>
      </section>
    )
  }
}