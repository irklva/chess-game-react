import React, {FC} from 'react';
import st from './timer0row.module.css';
import {formatTimer} from "../../../../utils/timerUtils";
import {timerType} from "../../../../store/reducers/timersSlice";

interface TimerRowProps {
    name: string;
    timer: timerType;
}

const TimerRow: FC<TimerRowProps> = ({name, timer}) => {
    return (
        <div className="d-flex align-items-center">
            <h5 className={st.name}>
                {name}:
            </h5>
            <h5 className={timer === null ? st.infinite : st.time}>
                {formatTimer(timer)}
            </h5>
        </div>
    );
};

export default TimerRow;