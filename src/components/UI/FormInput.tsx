import React from 'react';

interface FormInputProps {
    labelStyles: string,
    labelFor: string,
    inputStyles: string,
    inputType: string,
    onChange: (event: React.FormEvent) => void,
    inputId: string,
    inputValue: string,
    children: React.ReactNode
}

const FormInput: React.FC<FormInputProps> = (props) => {
    return (
        <React.Fragment>
            <label className={props.labelStyles} htmlFor={props.labelFor}>{props.children}</label>
            <input className={props.inputStyles} type={props.inputType} onChange={props.onChange} id={props.inputId} value={props.inputValue}/>
        </React.Fragment>
    );
}

export default FormInput;