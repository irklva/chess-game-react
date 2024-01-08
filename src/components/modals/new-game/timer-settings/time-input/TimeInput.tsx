import React, {FC} from 'react';
import st from "./time-input.module.css";
import MyInput from "../../../../ui/input/MyInput";
import {timerType} from "../../../../../types/types";

interface TimeInputProps {
    name: string;
    timeValue: timerType;
    timeChange: (value: string) => void;
    maxLimit: number;
    message: string;
}

const TimeInput: FC<TimeInputProps> = ({
                                           timeValue,
                                           timeChange,
                                           name,
                                           maxLimit,
                                           message
                                       }) => {

    const noInputCondition = timeValue === null
                            || timeValue < 0
                            || timeValue > maxLimit;

    return (
        <div className={st.time}>
            <MyInput
                id={name}
                type="number"
                min="0"
                max={maxLimit}
                value={timeValue === null ? "" : timeValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    timeChange(e.target.value)
                }}
            />
            <div className={st.name}>
                {name}
            </div>
            {noInputCondition &&
                <div className={`text-danger ${st.message}`}>
                    {message}
                </div>
            }
        </div>
    );
};

export default TimeInput;