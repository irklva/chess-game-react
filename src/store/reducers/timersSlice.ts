import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type timerType = number | null;

interface TimersState {
    blackTimer: timerType;
    blackTimerMoment: timerType;
    whiteTimer: timerType;
    whiteTimerMoment: timerType;
    timeMoment: timerType;
    timeWinner: string | null;
}

const initialState: TimersState = {
    blackTimer: null,
    whiteTimer: null,
    blackTimerMoment: null,
    whiteTimerMoment: null,
    timeMoment: null,
    timeWinner: null
}

const timersSlice = createSlice({
    name: 'timers',
    initialState,
    reducers: {
        setBlackTimer(state, action) {
            state.blackTimer = action.payload;
        },
        setWhiteTimer(state, action) {
            state.whiteTimer = action.payload;
        },
        blackTimerMove(state) {
            const moment = new Date().getTime();
            state.blackTimer = state.blackTimerMoment && state.timeMoment
                ?
                state.blackTimerMoment - (moment - state.timeMoment)
                :
                null
        },
        whiteTimerMove(state) {
            const moment = new Date().getTime();
            state.whiteTimer = state.whiteTimerMoment && state.timeMoment
                ?
                state.whiteTimerMoment - (moment - state.timeMoment)
                :
                null
        },
        setBlackTimerMoment(state, action) {
            state.blackTimerMoment = action.payload;
        },
        setWhiteTimerMoment(state, action) {
            state.whiteTimerMoment = action.payload;
        },
        setTimeMoment(state, action) {
            state.timeMoment = action.payload;
        },
        setTimeWinner(state, action) {
            state.timeWinner = action.payload;
        },
        resetTimers(state, action) {
            state.blackTimer = action.payload;
            state.whiteTimer = action.payload;
            state.blackTimerMoment = action.payload;
            state.whiteTimerMoment = action.payload;
            state.timeWinner = null;
        },
        setTimersFromEntry(state, action) {
            state.timeMoment = new Date().getTime();
            state.blackTimerMoment = action.payload.blackTimer;
            state.whiteTimerMoment = action.payload.whiteTimer;
            state.blackTimer = action.payload.blackTimer;
            state.whiteTimer = action.payload.whiteTimer;
            state.timeWinner = null;
        },
        setTimersToNull(state) {
            state.blackTimer = null;
            state.whiteTimer = null;
            state.blackTimerMoment = null;
            state.whiteTimerMoment = null;
            state.timeMoment = null;
        }
    }
});

export const getBlackTimer = (state: RootState): timerType => state.timers.blackTimer;
export const getWhiteTimer = (state: RootState): timerType => state.timers.whiteTimer;
export const getBlackTimerMoment = (state: RootState): timerType => state.timers.blackTimerMoment;
export const getWhiteTimerMoment = (state: RootState): timerType => state.timers.whiteTimerMoment;
export const getTimeMoment = (state: RootState): timerType => state.timers.timeMoment;
export const getTimeWinner = (state: RootState): string | null => state.timers.timeWinner;
export const {setBlackTimer, setWhiteTimer, blackTimerMove, whiteTimerMove,
    setBlackTimerMoment, setWhiteTimerMoment, setTimeMoment, setTimeWinner,
    resetTimers, setTimersFromEntry, setTimersToNull} = timersSlice.actions;

export default timersSlice.reducer;