import React from "react";
import styles from '../../styles/UI/Error.module.css';

type ErrorContainerProps = {
    message: string;
}

const ErrorContainer: React.FC<ErrorContainerProps> = (props) => {
    return (
        <div className={styles.errorContainer}>{props.message}</div>
    );
}

export default ErrorContainer;