import type { Dispatch, SetStateAction } from 'react';

export type TimerType = number | null;

export interface TimerProps {
    isTimerRunning: boolean;
    setIsTimerRunning: Dispatch<SetStateAction<boolean>>;
}
