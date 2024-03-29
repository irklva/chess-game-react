import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getMinutesInput, getNewGameTimer, getSecondsInput } from '../../../../store/model/new-game/newGameSelectors';
import { minimumTimer, minutesLimit, secondsLimit } from '../../../../utils/constants';
import {
    formatTimer,
    formatTimerInputType,
    minutesConditions,
    secondsConditions,
    timerConditions,
} from '../../../../utils/timerHelpers';
import TimeInput from './time-input/TimeInput';
import st from './time-settings.module.css';
import { useTimerSettings } from './useTimerSettings';
import type { FC } from 'react';

interface TimerSettingsProps {
    areInfiniteSeconds: boolean;
}

const TimerSettings: FC<TimerSettingsProps> = ({ areInfiniteSeconds }) => {

    const minutesInput = useSelector(getMinutesInput);
    const secondsInput = useSelector(getSecondsInput);
    const timer = useSelector(getNewGameTimer);
    const timerConditionsMinutes = formatTimer(minimumTimer, formatTimerInputType.SEC);
    const timerConditionsSeconds = formatTimer(minutesLimit * 60, formatTimerInputType.SEC);

    const { changeMinutes, changeSeconds } = useTimerSettings();
    const isTimerMessage: boolean = !timerConditions(timer) &&
        minutesConditions(minutesInput) &&
        secondsConditions(secondsInput);

    return (
        <div className={`${st.main} ${areInfiniteSeconds ? st.collapsed : ''}`} >
            <label >Timer: </label >
            <div className={st.inputs_block} >
                <div className="d-flex justify-content-around" >
                    <TimeInput
                        name="minutes"
                        timeValue={minutesInput}
                        timeChange={changeMinutes}
                        maxLimit={minutesLimit}
                        message={areInfiniteSeconds ? '' : `0 - ${minutesLimit} minutes`}
                    />
                    <TimeInput
                        name="seconds"
                        timeValue={secondsInput}
                        timeChange={changeSeconds}
                        maxLimit={secondsLimit}
                        message={areInfiniteSeconds ? '' : `0 - ${secondsLimit} seconds`}
                    />
                </div >
                {isTimerMessage &&
                    <div className={`text-danger ${st.message}`} >
                        {timerConditionsMinutes} - {timerConditionsSeconds}
                    </div >
                }
            </div >
        </div >
    );
};

export default memo(TimerSettings);
