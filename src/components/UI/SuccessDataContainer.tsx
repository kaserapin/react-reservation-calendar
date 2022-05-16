import React from 'react';
import styles from '../../styles/UI/Container.module.css';

interface ContainerProps {
    label: string;
    data: string;
}

const SuccessDataContainer: React.FC<ContainerProps> = (props) => {
    return (
        <div className={styles.container}>
            <span className={styles.label}>{props.label}</span>
            <span className={styles.value}>{props.data}</span>
        </div>
    );
}

export default SuccessDataContainer;