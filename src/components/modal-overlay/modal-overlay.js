import React from 'react';
import styles from '../../styles/modal-overlay.module.css'

const ModalOverlay = React.memo(props => {
  return (
    <div className={ styles.overlay } onClick={ props.onClick }>
      {props.children}
    </div>
  )
})

export default ModalOverlay;