import {RootState} from "../../store";
import {timerType} from "../../../types/types";

export const getBlackTimer = (state: RootState): timerType => state.timers.blackTimer;
export const getWhiteTimer = (state: RootState): timerType => state.timers.whiteTimer;
export const getBlackTimerMoment = (state: RootState): timerType => state.timers.blackTimerMoment;
export const getWhiteTimerMoment = (state: RootState): timerType => state.timers.whiteTimerMoment;
export const getTimeMoment = (state: RootState): timerType => state.timers.timeMoment;
export const getTimeWinner = (state: RootState): string | null => state.timers.timeWinner;