import { formatTimer, formatTimerInputType } from '../../../../utils/timerHelpers';
import st from './timer-row.module.css';
import type { TimerType } from '../../../../types/types';
import type { FC } from 'react';

interface TimerRowProps {
    name: string;
    timer: TimerType;
}

const TimerRow: FC<TimerRowProps> = ({ name, timer }) => {
    return (
        <div className="d-flex">
            <h5 className={st.name}>
                {name}:
            </h5>
            <h5 className={timer === null ? st.infinite : st.timer}>
                {formatTimer(timer, formatTimerInputType.MS)}
            </h5>
        </div>
    );
};

export default TimerRow;
