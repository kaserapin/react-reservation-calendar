import React from 'react';
import ControlPanel from './Control-panel/ControlPanel';
import CalendarDays from './CalendarDays';
import styles from '../../styles/Calendar/Calendar.module.css';

interface CalendarProps {
    onRightArrowClick: () => void;
    onLeftArrowClick: () => void;
    displayedMonth: string[number];
    displayedYear: number;
    currentDays: Array<{
        isCurrentMonth: boolean,
        date: Date,
        monthNumber: number,
        monthInWords: string,
        dayNumber: number,
        year: number
    }>;
    onCalendarDayClick: (event: React.MouseEvent) => void;
}

const Calendar: React.FC<CalendarProps> = (props) => {

    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <React.Fragment>
            <ControlPanel onRightArrowClick={props.onRightArrowClick}
                          onLeftArrowClick={props.onLeftArrowClick}
                          displayedMonth={props.displayedMonth}
                          displayedYear={props.displayedYear}/>
            <div className={styles.calendar}>
                {
                    weekdays.map((weekday) => {
                        return <div key={`${weekday}`} className={styles['week-day-name']}><p>{weekday}</p></div>
                    })
                }
                <CalendarDays currentDays={props.currentDays}
                              onCalendarDayClick={props.onCalendarDayClick}/>
            </div>
        </React.Fragment>
    );
}

export default Calendar;