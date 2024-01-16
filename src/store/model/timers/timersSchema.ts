import type { TimerType } from '../../../types/types';

export interface TimersSchema {
    blackTimer: TimerType;
    blackTimerMoment: TimerType;
    whiteTimer: TimerType;
    whiteTimerMoment: TimerType;
    timeMoment: TimerType;
    timeWinner: string | null;
}
