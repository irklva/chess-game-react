import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface TimersState {
    blackTimer: number | null;
    blackTimerMoment: number | null;
    whiteTimer: number | null;
    whiteTimerMoment: number | null;
    timeMoment: number | null;
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
        }
    }
});

export const getBlackTimer = (state: RootState): number | null => state.timers.blackTimer;
export const getWhiteTimer = (state: RootState): number | null => state.timers.whiteTimer;
export const getBlackTimerMoment = (state: RootState): number | null => state.timers.blackTimerMoment;
export const getWhiteTimerMoment = (state: RootState): number | null => state.timers.whiteTimerMoment;
export const getTimeMoment = (state: RootState): number | null => state.timers.timeMoment;
export const getTimeWinner = (state: RootState): string | null => state.timers.timeWinner;
export const {setBlackTimer, setWhiteTimer, blackTimerMove, whiteTimerMove,
    setBlackTimerMoment, setWhiteTimerMoment, setTimeMoment, setTimeWinner} = timersSlice.actions;

export default timersSlice.reducer;