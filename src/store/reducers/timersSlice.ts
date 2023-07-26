import {createSlice} from "@reduxjs/toolkit";
import {secondDivisor} from "../../utils/constants";

interface TimersState {
    blackTimer: number | null;
    whiteTimer: number | null;
    timeWinner: string | null;
}

const initialState: TimersState = {
    blackTimer: null,
    whiteTimer: null,
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
            state.blackTimer = state.blackTimer ? state.blackTimer - 1000 / secondDivisor : null;
        },
        whiteTimerMove(state) {
            state.whiteTimer = state.whiteTimer ? state.whiteTimer - 1000 / secondDivisor : null;
        },
        setTimeWinner(state, action) {
            state.timeWinner = action.payload;
        }
    }
});

export const getBlackTimer = (state: any) => state.timers.blackTimer;
export const getWhiteTimer = (state: any) => state.timers.whiteTimer;
export const getTimeWinner = (state: any) => state.timers.timeWinner;
export const {setBlackTimer, setWhiteTimer, blackTimerMove, whiteTimerMove, setTimeWinner} = timersSlice.actions;

export default timersSlice.reducer;