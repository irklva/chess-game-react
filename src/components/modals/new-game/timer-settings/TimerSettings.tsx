import React, {FC} from 'react';
import st from "./time-settings.module.css";
import {minutesLimit, secondsLimit} from "../../../../utils/newGameConstants";
import TimeInput from "./time-input/TimeInput";
import {useSelector} from "react-redux";
import {useTimerSettings} from "./useTimerSettings";
import {minutesConditions, secondsConditions, timerConditions} from "../../../../utils/timerUtils";
import {getMinutesInput, getNewGameTimer, getSecondsInput} from "../../../../store/model/new-game/newGameSelectors";

const TimerSettings: FC = () => {

    const minutesInput = useSelector(getMinutesInput);
    const secondsInput = useSelector(getSecondsInput);
    const timer = useSelector(getNewGameTimer);

    const {minutesChange, secondsChange} = useTimerSettings(minutesInput, secondsInput);
    const timerMessage: boolean = !timerConditions(timer)
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