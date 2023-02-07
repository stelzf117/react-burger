import { memo } from 'react';
import styles from '../../styles/modal-overlay.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = memo(({ onClose, children }) => {
  const { overlay, wrapper } = styles;
  return (
    <div className={ wrapper }>
      { children }
      <div className={ overlay } onClick={ onClose } />
    </div>
  )
})

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}.isRequired

export default ModalOverlay;