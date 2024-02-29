import { memo } from 'react';
import AppInput from '../../../../ui/input/AppInput';
import st from './time-input.module.css';
import type { TimerType } from '../../../../../types/types';
import type { ChangeEvent, FC } from 'react';

interface TimeInputProps {
    name: string;
    timeValue: TimerType;
    timeChange: (value: string) => void;
    maxLimit: number;
    message: string;
}

const TimeInput: FC<TimeInputProps> = ({
    timeValue,
    timeChange,
    name,
    maxLimit,
    message,
}) => {

    const noInputCondition = timeValue === null ||
                            timeValue < 0 ||
                            timeValue > maxLimit;

    return (
        <div className={st.main} >
            <AppInput
                id={name}
                type="number"
                min="0"
                max={maxLimit}
                value={timeValue === null ? '' : timeValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    timeChange(e.target.value);
                }}
            />
            <div className={st.name} >
                {name}
            </div >
            {noInputCondition &&
                <div className={`text-danger ${st.message}`} >
                    {message}
                </div >
            }
        </div >
    );
};

export default memo(TimeInput);
