import React from "react";
import SuccessDataContainer from "../UI/SuccessDataContainer";
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
        <div className={styles.reservationDetails}>
            <SuccessDataContainer label={"Name:"} data={props.successData.firstName} />
            <SuccessDataContainer label={"Last name:"} data={props.successData.lastName} />
            <SuccessDataContainer label={"Reservation date:"} data={`${year} ${month} ${day} - ${hour}:00`} />
        </div>
    );
}

export default ModalSuccess;