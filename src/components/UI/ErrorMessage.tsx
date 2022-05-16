import React from "react";

interface ErrorMessageProps {
    errorMessageStyles: string,
    children: React.ReactNode
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
    return <p className={props.errorMessageStyles}>{props.children}</p>
}

export default ErrorMessage;