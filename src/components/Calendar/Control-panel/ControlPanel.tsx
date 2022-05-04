import React from "react";
import styles from '../../../styles/Calendar/ControlPanel.module.css';

interface ControlPanelProps {
    onLeftArrowClick: () => void;
    onRightArrowClick: () => void;
    displayedMonth: string[number];
    displayedYear: number;
}

const ControlPanel: React.FC<ControlPanelProps> = (props) => {
    return (
        <div className={styles['calendar-control-panel']}>
            <div className={styles['arrow-left']}>
                <span className="material-icons" onClick={props.onLeftArrowClick}>keyboard_arrow_left</span>
            </div>
            <div className="date-container">
                <span className="month">{props.displayedMonth}</span>
                <span>{' '}</span>
                <span className="year">{props.displayedYear}</span>
            </div>
            <div className={styles['arrow-right']}>
                <span className="material-icons" onClick={props.onRightArrowClick}>keyboard_arrow_right</span>
            </div>
        </div>
    )
}

export default ControlPanel
