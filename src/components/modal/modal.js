import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay.js';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

const Modal = React.memo( props => {
  const { popupClose } = props; 
  const handleCloseEsc = e => { if(e.key === 'Escape') {popupClose()} };
  React.useEffect(() => {
    document.addEventListener('keydown', handleCloseEsc);
    return () => {
      document.removeEventListener('keydown', handleCloseEsc);
    };
  },
    []
  );
  const { wrapper, close, inner } = styles;
  return ReactDOM.createPortal ((
    <>
      
      <div className={ wrapper }>
          { 
            props.popup === 'ingredient' ?
            (<IngredientDetails popupClose={ popupClose } {...props} />) 
            : 
            (<OrderDetails popupClose={ popupClose } />)
          }
      </div>
      <ModalOverlay onClick={ popupClose } />
      
    </>
    ),
    modalRoot
    )
});

export default Modal;