import React from "react";
import styles from '../../styles/Calendar/Calendar-days.module.css';

interface CalendarDaysProps {
    onCalendarDayClick: (event: React.MouseEvent) => void;
    currentDays: any[]
}

const CalendarDays: Function = (props: CalendarDaysProps) => {

    return (
        props.currentDays.map((day) => {
            return (
                <button key={`${day.year}-${day.monthNumber}+${day.dayNumber}`}
                        className={styles.day + (day.isCurrentMonth ? "" : ` ${styles['other-month']}`) +
                            (day.dayNumber === new Date().getDate()
                            && day.monthNumber === new Date().getMonth()
                            && day.year === new Date().getFullYear() ? ` ${styles.current}` : "")}
                        onClick={props.onCalendarDayClick}
                        data-day={day.dayNumber}
                        disabled={!day.isCurrentMonth}
                        type='button'>{day.dayNumber}</button>
            )
        })
    )
}

export default CalendarDays;