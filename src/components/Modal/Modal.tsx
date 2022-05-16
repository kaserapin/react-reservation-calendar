import React, {useState} from 'react'
import ModalForm from "./ModalForm";
import ModalSuccess from "./ModalSuccess";
import ModalReservationList from "./ModalReservationList";
import ErrorContainer from "../UI/ErrorContainer";
import Loader from "../UI/Loader";
import styles from '../../styles/Modal/Modal.module.css';

interface ModalProps  {
    isModalOpen: boolean;
    onCloseModalClick: () => void;
    openedDay: number | null;
    openedMonthInWords: string | null;
    openedMonth: number | null;
    openedYear: number | null;
    reservations: Array<{
        date: Date,
        reserved: boolean,
        expired: boolean
    }>;
    isLoading: boolean
}

const Modal: React.FC<ModalProps> = (props) => {

    let [modalStep, setModalStep] = useState<number>(1);
    const [isValidFirstName, setIsValidFirstName] = useState<boolean>(false);
    const [isValidLastName, setIsValidLastName] = useState<boolean>(false);
    const [isFormTouched, setIsFormTouched] = useState<boolean>(false);
    const [selectedHour, setSelectedHour] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [firstNameInput, setFirstNameInput] = useState<string>('');
    const [lastNameInput, setLastNameInput] = useState<string>('');
    const [successData, setSuccessData] = useState<{
        firstName: string;
        lastName: string;
        date: string
    }>({
        firstName: '',
        lastName: '',
        date: ''
    })

    const increaseModalStep = (): void => {
        setModalStep(modalStep += 1);
    }

    const onSelectClick = (event: React.MouseEvent) => {
        const hourWrapper = (event.target as HTMLElement).parentNode!.parentNode!.children[0].children[1];
        setSelectedHour((hourWrapper as HTMLElement).dataset.hour);
        increaseModalStep();
    }

    const onFirstNameChange = (event: React.FormEvent) => {
        setFirstNameInput((event.target as HTMLInputElement).value);
        firstNameInput.trim() === '' ? setIsValidFirstName(false) : setIsValidFirstName(true);
    }

    const onLastNameChange = (event: React.FormEvent) => {
        setLastNameInput((event.target as HTMLInputElement).value);
        lastNameInput.trim() === '' ? setIsValidLastName(false) : setIsValidLastName(true);
    }

    const formSubmit = (event: React.FormEvent) => {
        setIsLoading(true);
        event.preventDefault();
        setIsFormTouched(true);

        if (!isValidFirstName || !isValidLastName) {
            setIsLoading(false);
            return;
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `mutation {
                    bookReservation(reservationInput: {
                        firstName: "${firstNameInput}",
                        lastName: "${lastNameInput}",
                        date: "${new Date(props.openedYear!, props.openedMonth!, props.openedDay!, +selectedHour!)}"
                    }) {
                        _id
                        firstName
                        lastName
                        date
                        createdAt
                        updatedAt
                    }
                }`
            })
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.errors) {
                    setIsError(true);
                    setErrorMessage(result.errors[0].message);
                    setIsLoading(false);
                    return;
                }
                setIsError(false);
                setSuccessData({
                    firstName: result.data.bookReservation.firstName,
                    lastName: result.data.bookReservation.lastName,
                    date: result.data.bookReservation.date
                })
                increaseModalStep();
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }

    const decreaseModalStep = (): void => {
        setModalStep(modalStep -= 1);
        setIsError(false);
        setFirstNameInput('');
        setLastNameInput('');
    }

    const renderModalContent = () => {
        switch (modalStep) {
            case 1:
                return (
                    <React.Fragment>
                        {props.isLoading ? <Loader /> : <ModalReservationList onSelectClick={onSelectClick}
                                                                              openedDay={props.openedDay}
                                                                              openedMonth={props.openedMonthInWords}
                                                                              openedYear={props.openedYear}
                                                                              reservations={props.reservations}/>}

                    </React.Fragment>);
            case 2:
                return (
                    <React.Fragment>
                        {isError && <ErrorContainer message={errorMessage}/>}
                        {isLoading ?
                            <Loader /> :
                            <ModalForm onFormSubmit={formSubmit} firstName={firstNameInput}
                                       lastName={lastNameInput} isFirstNameValid={isValidFirstName}
                                       onFirstNameChange={onFirstNameChange} onLastNameChange={onLastNameChange}
                                       isLastNameValid={isValidLastName} isFormTouched={isFormTouched}/>}
                    </React.Fragment>
                );
            case 3:
                return (
                    <React.Fragment>
                        { isLoading ? <Loader /> : <ModalSuccess successData={successData}/>}
                    </React.Fragment>
                )
        }
    }

    const headerText = () => {
        switch (modalStep) {
            case 1:
                return "Select reservation time";
            case 2:
                return `${props.openedYear} ${props.openedMonthInWords} ${props.openedDay} ${selectedHour}:00`;
            case 3:
                return "Reservation succeeded";
        }

    }

    return (
        <div className={props.isModalOpen ? `${styles.registrationModal} ${styles.opened}` : `${styles.registrationModal}`}>
            <div className={styles.modalHeader}>
                {modalStep === 2 &&
                    <div className={`material-icons ${styles.backBtn}`} onClick={decreaseModalStep}>keyboard_arrow_left</div>}
                <div className="title">
                    {headerText()}
                </div>
                <div className={styles.closeButton} onClick={props.onCloseModalClick}>
                    <span className="material-icons">close</span>
                </div>
            </div>
            <div className={styles.modalContent}>
                {renderModalContent()}
            </div>
        </div>
    );
}

export default Modal;