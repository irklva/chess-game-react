import { useSelector } from 'react-redux';
import { getBlackName, getWhiteName } from '../../../store/model/players/playersSelectors';
import { getBlackTimer, getTimeMoment, getWhiteTimer } from '../../../store/model/timers/timersSelectors';
import TimerRow from './timer-row/TimerRow';
import { useTimer } from './useTimer';
import type { Dispatch, FC, SetStateAction } from 'react';

export interface TimersProps {
    setIsTimerVisible: (isVisible: boolean) => void;
    isTimerRunning: boolean;
    setIsTimerRunning: Dispatch<SetStateAction<boolean>>;
}

const Timers: FC<TimersProps> = ({ setIsTimerVisible, isTimerRunning, setIsTimerRunning }) => {

    const blackTimer = useSelector(getBlackTimer);
    const whiteTimer = useSelector(getWhiteTimer);
    const blackName = useSelector(getBlackName);
    const whiteName = useSelector(getWhiteName);
    const timeMoment = useSelector(getTimeMoment);

    useTimer({
        isTimerRunning,
        setIsTimerRunning,
        setIsTimerVisible,
    });

    return (
        <div className="timers-block" >
            <div className={`d-flex flex-column ${timeMoment ? 'align-items-end' : 'align-items-center'}`} >
                <TimerRow name={blackName} timer={blackTimer} />
                <TimerRow name={whiteName} timer={whiteTimer} />
            </div >
        </div >
    );
};

export default Timers;
