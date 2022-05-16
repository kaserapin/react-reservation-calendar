import React from "react";
import ReservationRow from "./ReservationRow";

interface ModalReservationListProps {
    reservations: Array<{
        date: Date,
        reserved: boolean,
        expired: boolean
    }>
    onSelectClick: (event: React.MouseEvent) => void;
    openedDay: number | null;
    openedMonth: string | null;
    openedYear: number | null;
}

const ModalReservationList: React.FC<ModalReservationListProps> = (props) => {
    const { reservations } = props;

    const reservationRow = reservations.map(reservation => {
        const formattedDate = new Date(reservation.date);
        const isReserved = reservation.reserved;
        const isExpired = reservation.expired;

        let buttonText;

        if (isReserved && isExpired) {
            buttonText = 'Reserved'
        } else if (isReserved && !isExpired) {
            buttonText = 'Reserved'
        } else if (!isReserved && isExpired) {
            buttonText = 'Expired'
        } else {
            buttonText = 'Select'
        }
        return (
            <ReservationRow
                key={`${props.openedDay}-${props.openedMonth}-${props.openedYear}-${formattedDate.getHours()}`}
                openedDay={props.openedDay}
                openedMonth={props.openedMonth}
                openedYear={props.openedYear}
                hour={formattedDate.getHours()}
                isDisabled={isReserved || isExpired}
                buttonText={buttonText}
                onReservationClick={props.onSelectClick}/>
        );
    })

    return (
        <React.Fragment>
            {reservationRow}
        </React.Fragment>
    );
}

export default ModalReservationList;