import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../styles/modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay.js';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

const Modal = memo(({ onClose, children }) => {
  const handleCloseEsc = e => { if(e.key === 'Escape') {onClose()} };
  useEffect(() => {
    document.addEventListener('keydown', handleCloseEsc);
    return () => {
      document.removeEventListener('keydown', handleCloseEsc);
    };
  },
    []
  );
  const { wrapper, close } = styles;
  return createPortal ((
      <ModalOverlay onClose={ onClose }>
        <div className={ wrapper }>
          <button className={ close } onClick={ onClose }>
            <CloseIcon />
          </button>
          { children }
        </div>
      </ModalOverlay>

    ),
    modalRoot
    )
});

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}.isRequired

export default Modal;