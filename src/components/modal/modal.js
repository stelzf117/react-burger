import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay.js';
import doneImage from '../../images/done.jpg'
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

const Modal = React.memo(({ popupClose }) => {
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
      
      <div className={wrapper}>
        <button className={ close } onClick={ popupClose } >
          <CloseIcon type="primary" />
        </button>
        <div className={inner}>
        </div>
      </div>
      <ModalOverlay onClick={popupClose} />
      
    </>
    ),
    modalRoot
    )
});

//<div className={styles.inner}>
//          <p className={styles.digits}>034536</p>
//          <p className={styles.text1}>идентификатор заказа</p>
//          <img className={styles.done} src={doneImage} alt='done' />
//          <p className={styles.text2}>ваш заказ начали готовить</p>
//          <p className={styles.text3}>дождитесь готовности на орбитальной станции</p>
//        </div>

export default Modal;