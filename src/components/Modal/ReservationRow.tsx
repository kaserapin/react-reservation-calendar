import React from "react";
import styles from '../../styles/Modal/ReservationRow.module.css';

interface  ReservationRowProps {
    openedDay: number | null;
    openedMonth: string | null;
    openedYear: number | null;
    hour: number;
    isDisabled: boolean;
    buttonText: string;
    onReservationClick: (event: React.MouseEvent) => void;
}

const ReservationRow: React.FC<ReservationRowProps> = (props) => {
    return (
        <div className={styles.row}>
            <div className={styles.timeWrapper}>
                <div>{props.openedDay} {props.openedMonth} {props.openedYear}</div>
                <div className={styles.hour} data-hour={props.hour}>{props.hour}:00</div>
            </div>
            <div className="actions-wrapper">
                <button className={props.isDisabled ?
                    `${styles.reservationBtn} ${styles.disabled}` :
                    `${styles.reservationBtn} ${styles.enabled}`}
                        onClick={props.onReservationClick}
                        disabled={props.isDisabled}>
                    {props.buttonText}
                </button>
            </div>
        </div>
    );
}

export default ReservationRow;