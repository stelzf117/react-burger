import React from 'react';
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/app-header.module.css'
import PropTypes from 'prop-types';


const AppHeader = React.memo(() => {
  const [ state, setState ] = React.useState({
    constructor: 'primary',
    orders: 'secondary',
    login: 'secondary'
  })
  const { header, wrapper, menu, item, logo } = styles;

  return (
    <header className = { header }>
         <div className = { wrapper }>
           <ul className = { menu }>

             <li className = { item }>
               <Button
               type = { state.constructor }
               icon = { <BurgerIcon type = { state.constructor } />}>
                Конструктор
                </Button>
              </li>

              <li className = {item}>
                <Button
                type = { state.orders }
                icon = {<ListIcon type = { state.orders } />}>
                  Лента заказов
                  </Button>
              </li>

            </ul>
           <div className={ logo }>
            <Logo />
           </div>
           <Button 
           type = { state.login }
           icon={<ProfileIcon type = { state.login } />}>Личный кабинет</Button>
         </div>
    </header>
  )
})

export default AppHeader;
// ----------------------

const Button = React.memo(props => {
  const { button, inactive, text } = styles;
  const { icon, children, type } = props;
  const textClass = type === 'secondary' ? inactive : text
  return (
    <button className={button}>
      {icon}
      <p className={textClass}>
        {children}
      </p>
    </button>
  )
})

Button.propTypes = {
  type: PropTypes.string.isRequired
}.isRequired