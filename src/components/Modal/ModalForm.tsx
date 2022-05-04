import React from "react";
import styles from '../../styles/Modal/ModalForm.module.css';
import errorStyles from '../../styles/UI/Error.module.css';

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
                <label className={invalidFirstName ? `${styles.error}` : ''} htmlFor="firstName">First name</label>
                <input className={invalidFirstName ? `${styles.error}` : ''} value={props.firstName} onChange={props.onFirstNameChange} id="firstName" type="text"/>
                {invalidFirstName && <p className={errorStyles['error-message']}>Incorrect input value</p>}
                <label className={invalidLastName ? `${styles.error}` : ''} htmlFor="lastName">Last name</label>
                <input className={invalidLastName ? `${styles.error}` : ''} value={props.lastName} onChange={props.onLastNameChange} id="lastName" type="text"/>
                {invalidLastName && <p className={errorStyles['error-message']}>Incorrect input value</p>}
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default ModalForm;