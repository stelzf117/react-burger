import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay.js';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

const Modal = React.memo( props => {
  const { popupClose } = props; 
  const handleCloseEsc = e => { if(e.key === 'Escape') {popupClose()} };
  React.useEffect(() => {
    console.log(props)
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
        <button className={ close } onClick={ popupClose } >
          <CloseIcon type="primary" />
        </button>
        <div className={ inner }>
          { props.popup === 'ingredient' ? 
          'ingredient' 
          : (
            <OrderDetails />
          )}
        </div>
      </div>
      <ModalOverlay onClick={ popupClose } />
      
    </>
    ),
    modalRoot
    )
});

export default Modal;