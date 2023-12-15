import {Dispatch, SetStateAction} from "react";

export type timerType = number | null;

export interface TimerProps {
    isTimerRunning: boolean;
    setIsTimerRunning: Dispatch<SetStateAction<boolean>>;
}