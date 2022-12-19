import React from 'react';
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/app-header.module.css'

export default class AppHeader extends React.Component {
  state = {
    buttons: {
      constructor: 'primary',
      orders: 'secondary',
      login: 'secondary',
    }
  }
  render() {
    const { header, wrapper, menu, item, logo } = styles;
    const {constructor, orders, login} =  this.state.buttons;

    return (
      <header className={header}>
           <div className={wrapper}>
             <ul className={menu}>
               <li className={item}>
                 <Button type={constructor} icon={<BurgerIcon type={constructor} />}>Конструктор</Button>
                </li>
                <li className={item}>
                  <Button type={orders} icon={<ListIcon type={orders} />}>Лента заказов</Button>
                </li>
              </ul>
             <div className={logo}>
              <Logo />
             </div>
             <Button type={login} icon={<ProfileIcon type={login} />}>Личный кабинет</Button>
           </div>
      </header>
    )
  }
}

class Button extends React.Component {
  render () {
    const { button, inactive, text } = styles;
    const { icon, children, type } = this.props;
    const textClass = type === 'secondary' ? inactive : text;

    return (
      <button className={button}>
        {icon}
        <p className={textClass}>
          {children}
        </p>
      </button>
    )
  }
}