import {timerType} from "../../../types/types";

export interface TimersSchema {
    blackTimer: timerType;
    blackTimerMoment: timerType;
    whiteTimer: timerType;
    whiteTimerMoment: timerType;
    timeMoment: timerType;
    timeWinner: string | null;
}