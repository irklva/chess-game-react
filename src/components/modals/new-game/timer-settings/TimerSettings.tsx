import { useSelector } from 'react-redux';
import { getMinutesInput, getNewGameTimer, getSecondsInput } from '../../../../store/model/new-game/newGameSelectors';
import { minimumTimer, minutesLimit, secondsLimit } from '../../../../utils/newGameConstants';
import {
    formatTimer,
    formatTimerInputType,
    minutesConditions,
    secondsConditions,
    timerConditions
} from '../../../../utils/timerHelpers';
import TimeInput from './time-input/TimeInput';
import st from './time-settings.module.css';
import { useTimerSettings } from './useTimerSettings';
import type { FC } from 'react';

const TimerSettings: FC = () => {

    const minutesInput = useSelector(getMinutesInput);
    const secondsInput = useSelector(getSecondsInput);
    const timer = useSelector(getNewGameTimer);
    const timerConditionsMinutes = formatTimer(minimumTimer, formatTimerInputType.SEC);
    const timerConditionsSeconds = formatTimer(minutesLimit * 60, formatTimerInputType.SEC);

    const { minutesChange, secondsChange } = useTimerSettings();
    const timerMessage: boolean = !timerConditions(timer) &&
        minutesConditions(minutesInput) &&
        secondsConditions(secondsInput);

    return (
        <div className={st.block}>
            <label>Timer: </label>
            <div className={st.input}>
                <div className="d-flex justify-content-between">
                    <TimeInput
                        name="minutes"
                        timeValue={minutesInput}
                        timeChange={minutesChange}
                        maxLimit={minutesLimit}
                        message={`0 - ${minutesLimit} minutes`}
                    />
                    <TimeInput
                        name="seconds"
                        timeValue={secondsInput}
                        timeChange={secondsChange}
                        maxLimit={secondsLimit}
                        message={`0 - ${secondsLimit} seconds`}
                    />
                </div>
                {timerMessage &&
                    <div className={`text-danger ${st.message}`}>
                        {timerConditionsMinutes} - {timerConditionsSeconds}
                    </div>
                }
            </div>
        </div>
    );
};

export default TimerSettings;
