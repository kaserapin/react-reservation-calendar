import Header from './components/Header';
import Modal from "./components/Modal/Modal";
import Calendar from './components/Calendar/Calendar';
import styles from './styles/UI/Main.module.css';
import React, {useState} from "react";
import Overlay from "./components/UI/Overlay";

function App() {
    let today = new Date();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [openedDay, setOpenedDay] = useState<number | null>(null);
    const [openedMonth, setOpenedMonth] = useState<number | null>(null);
    const [openedMonthInWords, setOpenedMonthInWords] = useState<string | null>(null);
    const [openedYear, setOpenedYear] = useState<number  | null>(null);
    const [reservations, setReservations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [displayedMonth, setDisplayedMonth] = useState<number>(today.getMonth());
    const [displayedYear, setDisplayedYear] = useState<number>(today.getFullYear());

    const firstDayOfMonth = new Date(today.getFullYear(), displayedMonth, -1);
    const weekdayOfFirstDay = firstDayOfMonth.getDay() - 1;
    const currentDays = [];
    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    for (let day = 0; day < 42; day++) {

        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate());
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }

        let calendarDay = {
            isCurrentMonth: (firstDayOfMonth.getMonth() === displayedMonth),
            date: (new Date(firstDayOfMonth)),
            monthNumber: firstDayOfMonth.getMonth(),
            monthInWords: monthsArray[firstDayOfMonth.getMonth()],
            dayNumber: firstDayOfMonth.getDate(),
            year: firstDayOfMonth.getFullYear()
        }

        currentDays.push(calendarDay);
    }

    const openModal = (event: React.MouseEvent) => {
        setIsModalOpen(true);
        setIsLoading(true);

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `{
            reservations(date: "${new Date(displayedYear, displayedMonth, +(event.target as HTMLElement).dataset.day!)}") {
                _id
                date
                reserved
                expired
            }
        }`
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {

                const reservations = result.data.reservations;
                setReservations(reservations);

                reservations.map((reservation: {
                    date: string
                }) => {
                    const date = reservation.date;
                    const formattedDate = new Date(date);

                    setOpenedDay(formattedDate.getDate());
                    setOpenedMonthInWords(formattedDate.toLocaleDateString('default', {month: 'long'}));
                    setOpenedMonth(formattedDate.getMonth());
                    setOpenedYear(formattedDate.getFullYear());
                    setIsLoading(false);
                    return reservation;
                })
            });
    }

    const hideModal = (): void => {
        setIsModalOpen(false);
    }

    const showPreviousMonth = (): void => {
        const year = (displayedMonth === 0) ? displayedYear - 1 : displayedYear;
        const month = (displayedMonth === 0) ? 11 : displayedMonth - 1;

        setDisplayedMonth(month);
        setDisplayedYear(year);
    }

    const showNextMonth = (): void => {
        const year = (displayedMonth === 11) ? displayedYear + 1 : displayedYear;
        const month = (displayedMonth + 1) % 12;

        setDisplayedMonth(month);
        setDisplayedYear(year);
    }

    return (
        <div className="App">
            {isModalOpen && <Overlay onHideModal={hideModal}/>}
            {isModalOpen && <Modal isModalOpen={isModalOpen}
                                   onCloseModalClick={hideModal}
                                   openedDay={openedDay}
                                   openedMonthInWords={openedMonthInWords}
                                   openedMonth={openedMonth}
                                   openedYear={openedYear}
                                   reservations={reservations}
                                   isLoading={isLoading}/>}
            <Header/>
            <div className={styles.main}>
                <Calendar onCalendarDayClick={openModal}
                          currentDays={currentDays}
                          onRightArrowClick={showNextMonth}
                          onLeftArrowClick={showPreviousMonth}
                          displayedMonth={monthsArray[displayedMonth]}
                          displayedYear={displayedYear}/>
            </div>
        </div>
    );
}

export default App;
