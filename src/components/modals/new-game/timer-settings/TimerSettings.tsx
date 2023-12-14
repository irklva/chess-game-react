import React, {FC} from 'react';
import st from "./time-settings.module.css";
import {minutesLimit, secondsLimit} from "../../../../utils/newGameConstants";
import TimeInput from "./time-input/TimeInput";
import {useSelector} from "react-redux";
import {getMinutesInput, getNewTimer, getSecondsInput} from "../../../../store/reducers/newGameSlice";
import {useTimerSettings} from "./useTimerSettings";
import {minutesConditions, secondsConditions, timerConditions} from "../../../../utils/timerUtils";

const TimerSettings: FC = () => {

    const minutesInput = useSelector(getMinutesInput);
    const secondsInput = useSelector(getSecondsInput);
    const timer = useSelector(getNewTimer);

    const {minutesChange, secondsChange} = useTimerSettings(minutesInput, secondsInput);
    const timerMessage = !timerConditions(timer)
        && minutesConditions(minutesInput)
        && secondsConditions(secondsInput);

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
                        00:30 - 60:00
                    </div>
                }
            </div>
        </div>
    );
};

export default TimerSettings;