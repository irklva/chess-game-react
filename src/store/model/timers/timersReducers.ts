import {PayloadAction} from "@reduxjs/toolkit";
import {TimersSchema} from "./timersSchema";
import {checkAllTimerMoments} from "../../../utils/timerHelpers";
import {Colors} from "../../../chess-models";

export const timersReducers = {
    timerMove(state: TimersSchema, action: PayloadAction<Colors>) {
        const {newBlackTimerMoment, newWhiteTimerMoment} = checkAllTimerMoments(
            action.payload,
            state.blackTimerMoment,
            state.whiteTimerMoment,
            state.timeMoment
        )
        state.blackTimer = newBlackTimerMoment;
        state.whiteTimer = newWhiteTimerMoment;
    },
    setTimeWinner(state: TimersSchema, action: PayloadAction<TimersSchema['timeWinner']>) {
        state.timeWinner = action.payload;
    },
    rememberAllMoments(
        state: TimersSchema,
        action: PayloadAction<Pick<TimersSchema, 'blackTimerMoment' | 'whiteTimerMoment' | 'timeMoment'>>
    ) {
        state.blackTimerMoment = action.payload.blackTimerMoment;
        state.whiteTimerMoment = action.payload.whiteTimerMoment;
        state.timeMoment = action.payload.timeMoment;
    },
    setTimers(state: TimersSchema, action: PayloadAction<Pick<TimersSchema, 'blackTimer' | 'whiteTimer'>>) {
        action.payload ?
            state.timeMoment = new Date().getTime()
            :
            state.timeMoment = null
        state.blackTimerMoment = action.payload.blackTimer;
        state.whiteTimerMoment = action.payload.whiteTimer;
        state.blackTimer = action.payload.blackTimer;
        state.whiteTimer = action.payload.whiteTimer;
        state.timeWinner = null;
    }
}