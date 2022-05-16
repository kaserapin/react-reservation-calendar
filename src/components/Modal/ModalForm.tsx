import React from "react";
import FormInput from "../UI/FormInput";
import styles from '../../styles/Modal/ModalForm.module.css';
import errorStyles from '../../styles/UI/Error.module.css';
import ErrorMessage from "../UI/ErrorMessage";

interface ModalFormProps {
    isFirstNameValid: boolean;
    isLastNameValid: boolean;
    isFormTouched: boolean;
    onFormSubmit: (event: React.FormEvent) => void;
    firstName: string;
    lastName: string;
    onFirstNameChange: (event: React.FormEvent) => void;
    onLastNameChange: (event: React.FormEvent) => void;
}

const ModalForm: React.FC<ModalFormProps> = props => {
    const invalidFirstName = !props.isFirstNameValid && props.isFormTouched;
    const invalidLastName = !props.isLastNameValid && props.isFormTouched;

    return (
        <form onSubmit={props.onFormSubmit}>
            <div className={styles.inner}>
                <FormInput labelStyles={invalidFirstName ? `${styles.error}` : ''}
                           inputStyles={invalidFirstName ? `${styles.error}` : ''}
                           labelFor="firstName"
                           inputType="text"
                           onChange={props.onFirstNameChange}
                           inputId="firstName"
                           inputValue={props.firstName}>First Name</FormInput>
                {invalidFirstName && <ErrorMessage errorMessageStyles={errorStyles.errorMessage}>Incorrect input value</ErrorMessage>}
                <FormInput labelStyles={invalidLastName ? `${styles.error}` : ''}
                           inputStyles={invalidLastName ? `${styles.error}` : ''}
                           labelFor="lastName"
                           inputType="text"
                           onChange={props.onLastNameChange}
                           inputId="lastName"
                           inputValue={props.lastName}>Last name</FormInput>
                {invalidLastName && <ErrorMessage errorMessageStyles={errorStyles.errorMessage}>Incorrect input value</ErrorMessage>}
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default ModalForm;