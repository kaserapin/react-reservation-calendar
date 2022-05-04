import React from 'react';
import styles from '../../styles/UI/Overlay.module.css';

interface OverlayProps {
    onHideModal: () => void;
}

const Overlay: React.FC<OverlayProps> = (props) => {
    return (
        <div className={styles.overlay} onClick={props.onHideModal}></div>
    );
}

export default Overlay;