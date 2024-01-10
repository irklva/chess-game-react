import {createSlice} from "@reduxjs/toolkit";
import {timersActions} from "./timersActions";
import {TimersSchema} from "./timersSchema";

const initialState: TimersSchema = {
    blackTimer: null,
    whiteTimer: null,
    blackTimerMoment: null,
    whiteTimerMoment: null,
    timeMoment: null,
    timeWinner: null,
}

const timersSlice = createSlice({
    name: 'timers',
    initialState,
    reducers: timersActions,
});

export const {setBlackTimer, setWhiteTimer, blackTimerMove, whiteTimerMove,
    setBlackTimerMoment, setWhiteTimerMoment, setTimeMoment, setTimeWinner,
    resetTimers, setTimersFromEntry, setTimersToNull} = timersSlice.actions;

export const timersReducer = timersSlice.reducer;