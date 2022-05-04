import React from "react";
import Container from "../UI/Container";
import styles from '../../styles/Modal/ModalSuccess.module.css';

interface ModalSuccessProps {
    successData: {
        date: string;
        firstName: string;
        lastName: string
    }
}

const ModalSuccess: React.FC<ModalSuccessProps> = props => {
    const successDate = props.successData.date;
    const year = new Date(successDate).getFullYear();
    const month = new Date(successDate).toLocaleDateString('default', {month: 'long'});
    const day = new Date(successDate).getDate();
    const hour = new Date(successDate).getHours();

    return (
        <div className={styles['reservation-details']}>
            <Container label={"Name:"} data={props.successData.firstName} />
            <Container label={"Last name:"} data={props.successData.lastName} />
            <Container label={"Reservation date:"} data={`${year} ${month} ${day} - ${hour}:00`} />
        </div>
    );
}

export default ModalSuccess;