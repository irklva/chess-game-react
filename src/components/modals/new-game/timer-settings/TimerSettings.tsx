import React, {Dispatch, FC, SetStateAction} from 'react';
import st from "./time-settings.module.css";
import MyInput from "../../../UI/input/MyInput";
import {minutesLimit, secondsLimit} from "../../../../utils/newGameConstants";
import {timerType} from "../../../../store/reducers/timersSlice";

interface TimerSettingsProps {
    timer: timerType;
    setTimer: Dispatch<SetStateAction<timerType>>;
    minutesInput: timerType;
    setMinutesInput: Dispatch<SetStateAction<timerType>>;
    secondsInput: timerType;
    setSecondsInput: Dispatch<SetStateAction<timerType>>;
}

const TimerSettings: FC<TimerSettingsProps> = ({
                                                   timer,
                                                   setTimer,
                                                   minutesInput,
                                                   setMinutesInput,
                                                   secondsInput,
                                                   setSecondsInput
                                               }) => {

    const minutesChange = (minutes: string | null) => {
        const newMinutes = minutes ? parseInt(minutes) : null;
        setMinutesInput(newMinutes);
        if (newMinutes !== null && secondsInput !== null) {
            setTimer(newMinutes * 60 + secondsInput);
        } else {
            setTimer(0);
        }
    }

    const secondsChange = (seconds: string | null) => {
        const newSeconds = seconds ? parseInt(seconds) : null;
        setSecondsInput(newSeconds);
        if (newSeconds !== null && minutesInput !== null) {
            setTimer(minutesInput * 60 + newSeconds);
        } else {
            setTimer(0);
        }
    }

    return (
        <div className={st.block}>
            <label>Timer: </label>
            <div className={st.input}>
                <div className="d-flex justify-content-between">
                    <div className={st.time}>
                        <MyInput id="minutes" type="number" min="0" max={minutesLimit}
                                 value={minutesInput === null ? "" : minutesInput}
                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                     minutesChange(e.target.value)
                                 }}/>
                        <div className={st.name}>minutes</div>
                        {(minutesInput === null || minutesInput < 0) &&
                            <div className={`text-danger ${st.message}`}>
                                0 - 60 minutes
                            </div>
                        }
                    </div>
                    <div className={st.time}>
                        <MyInput id="seconds" type="number" min="0" max={secondsLimit}
                                 value={secondsInput === null ? "" : secondsInput}
                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                     secondsChange(e.target.value)
                                 }}/>
                        <div className={st.name}>seconds</div>
                        {(secondsInput === null || (secondsInput < 0 || secondsInput > 59)) &&
                            <div className={`text-danger ${st.message}`}>
                                0 - 59 seconds
                            </div>
                        }
                    </div>
                </div>
                {timer !== null && minutesInput !== null && secondsInput !== null &&
                    (timer < 30 || timer > minutesLimit * 60) &&
                    <div className={`text-danger ${st.message}`}>
                        00:30 - 60:00
                    </div>
                }
            </div>
        </div>
    );
};

export default TimerSettings;