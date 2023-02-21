import { memo, useState, } from 'react';
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/app-header.module.css'
import PropTypes from 'prop-types';


const AppHeader = memo(() => {
  const [ state, setState ] = useState({
    constructor: 'primary',
    orders: 'secondary',
    login: 'secondary'
  })
  const { header, wrapper, menu, item, logo } = styles;

  return (
    <header className={ header }>
         <div className={ wrapper }>
           <ul className={ menu }>

             <li className={ item }>
               <Button
                  type={ state.constructor }
                  icon={ <BurgerIcon type={ state.constructor } />}>
                  Конструктор
                </Button>
              </li>

              <li className = { item }>
                <Button
                type={ state.orders }
                icon={ <ListIcon type={ state.orders } />}>
                  Лента заказов
                  </Button>
              </li>

            </ul>
           <div className={ logo }>
            <Logo />
           </div>
           <Button 
           type = { state.login }
           icon={<ProfileIcon type={ state.login } />}>Личный кабинет</Button>
         </div>
    </header>
  )
})

export default AppHeader;
// ----------------------

const Button = memo(({ icon, children, type }) => {
  const { button, inactive, text } = styles;
  const textClass = type === 'secondary' ? inactive : text
  return (
    <button className={ button }>
      { icon }
      <p className={ textClass }>
        { children }
      </p>
    </button>
  )
})

Button.propTypes = {
  icon: PropTypes.element.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}