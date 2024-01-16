import type { TimersSchema } from './timersSchema';
import type { RootState } from '../../store';

export const getBlackTimer = (state: RootState): TimersSchema['blackTimer'] => state.timers.blackTimer;
export const getWhiteTimer = (state: RootState): TimersSchema['whiteTimer'] => state.timers.whiteTimer;
export const getBlackTimerMoment = (state: RootState): TimersSchema['blackTimerMoment'] =>
    state.timers.blackTimerMoment;
export const getWhiteTimerMoment = (state: RootState): TimersSchema['whiteTimerMoment'] =>
    state.timers.whiteTimerMoment;
export const getTimeMoment = (state: RootState): TimersSchema['timeMoment'] => state.timers.timeMoment;
export const getTimeWinner = (state: RootState): TimersSchema['timeWinner'] => state.timers.timeWinner;
