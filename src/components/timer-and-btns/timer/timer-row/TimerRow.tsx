import React, {FC} from 'react';
import st from './timer-row.module.css';
import {formatTimer, formatTimerInputType} from "../../../../utils/timerHelpers";
import {TimerType} from "../../../../types/types";

interface TimerRowProps {
    name: string;
    timer: TimerType;
}

const TimerRow: FC<TimerRowProps> = ({name, timer}) => {
    return (
        <div className="d-flex">
            <h5 className={st.name}>
                {name}:
            </h5>
            <h5 className={timer === null ? st.infinite : st.time}>
                {formatTimer(timer, formatTimerInputType.MS)}
            </h5>
        </div>
    );
};

export default TimerRow;