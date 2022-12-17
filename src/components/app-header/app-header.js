import React from 'react';
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/app-header.module.css'

export default class AppHeader extends React.Component {
  state = {
    type: {
      constructor: 'primary',
      orders: 'secondary',
      login: 'secondary'
    }
  }
  render() {
    const { header, wrapper, menu, item, logo } = styles;
    console.log(this.state)
    return (
      <header className={header}>
           <div className={wrapper}>
             <ul className={menu}>
               <li className={item}>
                 <Button type={'burger'} icon={<BurgerIcon type={this.state.type.constructor} />}>Конструктор</Button>
                </li>
                <li className={item}>
                  <Button icon={<ListIcon type={this.state.type.orders} />}>Лента заказов</Button>
                </li>
              </ul>
             <div className={logo}>
              <Logo />
             </div>
             <Button icon={<ProfileIcon type={this.state.type.login} />}>Личный кабинет</Button>
           </div>
      </header>
    )
  }
}

class Button extends React.Component {
  state = {
    type: "primary"
  }
  render () {
    const { button, text } = styles;
    const { icon, children } = this.props;

    return (
      <button className={button}>
        {icon}
        <p className={text}>
          {children}
        </p>
      </button>
    )
  }
}