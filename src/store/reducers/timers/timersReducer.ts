import {createSlice} from "@reduxjs/toolkit";
import {timersActions, TimersState} from "./timersActions";

const initialState: TimersState = {
    blackTimer: null,
    whiteTimer: null,
    blackTimerMoment: null,
    whiteTimerMoment: null,
    timeMoment: null,
    timeWinner: null,
}

const timersReducer = createSlice({
    name: 'timers',
    initialState,
    reducers: timersActions,
});

export const {setBlackTimer, setWhiteTimer, blackTimerMove, whiteTimerMove,
    setBlackTimerMoment, setWhiteTimerMoment, setTimeMoment, setTimeWinner,
    resetTimers, setTimersFromEntry, setTimersToNull} = timersReducer.actions;

export default timersReducer.reducer;