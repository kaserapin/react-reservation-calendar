import React from "react";
import styles from '../../styles/Calendar/CalendarDays.module.css';

interface CalendarDaysProps {
    onCalendarDayClick: (event: React.MouseEvent) => void;
    currentDays: Array<{
        isCurrentMonth: boolean,
        date: Date,
        monthNumber: number,
        monthInWords: string,
        dayNumber: number,
        year: number
    }>
}

const CalendarDays: React.FC<CalendarDaysProps> = (props) => {
    const { currentDays } = props;

    const calendarDayButton = currentDays.map((day) => {
        const currentDayStyle = day.dayNumber === new Date().getDate() && day.monthNumber === new Date().getMonth() && day.year === new Date().getFullYear() ? ` ${styles.current}` : "";
        const monthStyles = day.isCurrentMonth ? "" : ` ${styles['other-month']}`;

        return (
            <button key={`${day.year}-${day.monthNumber}-${day.dayNumber}`}
                    className={`${styles.day} ${monthStyles} ${currentDayStyle}`}
                    onClick={props.onCalendarDayClick}
                    data-day={day.dayNumber}
                    disabled={!day.isCurrentMonth}
                    type='button'>{day.dayNumber}</button>
        )
    })

    return (
        <React.Fragment>
            {calendarDayButton}
        </React.Fragment>
    )
}

export default CalendarDays;