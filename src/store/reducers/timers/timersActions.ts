import {timerType} from "../../../types/types";
import {PayloadAction} from "@reduxjs/toolkit";

export interface TimersState {
    blackTimer: timerType;
    blackTimerMoment: timerType;
    whiteTimer: timerType;
    whiteTimerMoment: timerType;
    timeMoment: timerType;
    timeWinner: string | null;
}

export const timersActions = {
    setBlackTimer(state: TimersState, action: PayloadAction<TimersState['blackTimer']>) {
        state.blackTimer = action.payload;
    },
    setWhiteTimer(state: TimersState, action: PayloadAction<TimersState['whiteTimer']>) {
        state.whiteTimer = action.payload;
    },
    blackTimerMove(state: TimersState) {
        const moment = new Date().getTime();
        state.blackTimer = state.blackTimerMoment && state.timeMoment
            ?
            state.blackTimerMoment - (moment - state.timeMoment)
            :
            null
    },
    whiteTimerMove(state: TimersState) {
        const moment = new Date().getTime();
        state.whiteTimer = state.whiteTimerMoment && state.timeMoment
            ?
            state.whiteTimerMoment - (moment - state.timeMoment)
            :
            null
    },
    setBlackTimerMoment(state: TimersState, action: PayloadAction<TimersState['blackTimerMoment']>) {
        state.blackTimerMoment = action.payload;
    },
    setWhiteTimerMoment(state: TimersState, action: PayloadAction<TimersState['whiteTimerMoment']>) {
        state.whiteTimerMoment = action.payload;
    },
    setTimeMoment(state: TimersState, action: PayloadAction<TimersState['timeMoment']>) {
        state.timeMoment = action.payload;
    },
    setTimeWinner(state: TimersState, action: PayloadAction<TimersState['timeWinner']>) {
        state.timeWinner = action.payload;
    },
    resetTimers(state: TimersState, action: PayloadAction<TimersState['timeMoment']>) {
        state.blackTimer = action.payload;
        state.whiteTimer = action.payload;
        state.blackTimerMoment = action.payload;
        state.whiteTimerMoment = action.payload;
        state.timeWinner = null;
    },
    setTimersFromEntry(state: TimersState, action: PayloadAction<Pick<TimersState, 'blackTimer' | 'whiteTimer'>>) {
        state.timeMoment = new Date().getTime();
        state.blackTimerMoment = action.payload.blackTimer;
        state.whiteTimerMoment = action.payload.whiteTimer;
        state.blackTimer = action.payload.blackTimer;
        state.whiteTimer = action.payload.whiteTimer;
        state.timeWinner = null;
    },
    setTimersToNull(state: TimersState) {
        state.blackTimer = null;
        state.whiteTimer = null;
        state.blackTimerMoment = null;
        state.whiteTimerMoment = null;
        state.timeMoment = null;
    }
}