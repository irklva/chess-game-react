import {PayloadAction} from "@reduxjs/toolkit";
import {TimersSchema} from "./timersSchema";

export const timersActions = {
    setBlackTimer(state: TimersSchema, action: PayloadAction<TimersSchema['blackTimer']>) {
        state.blackTimer = action.payload;
    },
    setWhiteTimer(state: TimersSchema, action: PayloadAction<TimersSchema['whiteTimer']>) {
        state.whiteTimer = action.payload;
    },
    blackTimerMove(state: TimersSchema) {
        const moment = new Date().getTime();
        state.blackTimer = state.blackTimerMoment && state.timeMoment
            ?
            state.blackTimerMoment - (moment - state.timeMoment)
            :
            null
    },
    whiteTimerMove(state: TimersSchema) {
        const moment = new Date().getTime();
        state.whiteTimer = state.whiteTimerMoment && state.timeMoment
            ?
            state.whiteTimerMoment - (moment - state.timeMoment)
            :
            null
    },
    setBlackTimerMoment(state: TimersSchema, action: PayloadAction<TimersSchema['blackTimerMoment']>) {
        state.blackTimerMoment = action.payload;
    },
    setWhiteTimerMoment(state: TimersSchema, action: PayloadAction<TimersSchema['whiteTimerMoment']>) {
        state.whiteTimerMoment = action.payload;
    },
    setTimeMoment(state: TimersSchema, action: PayloadAction<TimersSchema['timeMoment']>) {
        state.timeMoment = action.payload;
    },
    setTimeWinner(state: TimersSchema, action: PayloadAction<TimersSchema['timeWinner']>) {
        state.timeWinner = action.payload;
    },
    resetTimers(state: TimersSchema, action: PayloadAction<TimersSchema['timeMoment']>) {
        state.blackTimer = action.payload;
        state.whiteTimer = action.payload;
        state.blackTimerMoment = action.payload;
        state.whiteTimerMoment = action.payload;
        state.timeWinner = null;
    },
    setTimersFromEntry(state: TimersSchema, action: PayloadAction<Pick<TimersSchema, 'blackTimer' | 'whiteTimer'>>) {
        state.timeMoment = new Date().getTime();
        state.blackTimerMoment = action.payload.blackTimer;
        state.whiteTimerMoment = action.payload.whiteTimer;
        state.blackTimer = action.payload.blackTimer;
        state.whiteTimer = action.payload.whiteTimer;
        state.timeWinner = null;
    },
    setTimersToNull(state: TimersSchema) {
        state.blackTimer = null;
        state.whiteTimer = null;
        state.blackTimerMoment = null;
        state.whiteTimerMoment = null;
        state.timeMoment = null;
    }
}