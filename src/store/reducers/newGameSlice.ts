import {timerType} from "../../types/types";
import {createSlice} from "@reduxjs/toolkit";
import {initialMinutes, initialSeconds} from "../../utils/newGameConstants";
import {RootState} from "../store";

interface NewGameState {
    blackNameInput: string;
    whiteNameInput: string;
    infiniteSeconds: boolean;
    minutesInput: timerType;
    secondsInput: timerType;
    newTimer: timerType;
}

const initialState: NewGameState = {
    blackNameInput: 'Black',
    whiteNameInput: 'White',
    infiniteSeconds: false,
    minutesInput: initialMinutes,
    secondsInput: initialSeconds,
    newTimer: initialMinutes * 60,
}

const newGameSlice = createSlice({
    name: 'newGame',
    initialState,
    reducers: {
        setBlackNameInput(state, action) {
            state.blackNameInput = action.payload;
        },
        setWhiteNameInput(state, action) {
            state.whiteNameInput = action.payload;
        },
        setMinutesInput(state, action) {
            state.minutesInput = action.payload;
        },
        setSecondsInput(state, action) {
            state.secondsInput = action.payload;
        },
        setNewTimer(state, action) {
            state.newTimer = action.payload;
        },
        setInfiniteSeconds(state) {
            if (!state.infiniteSeconds) {
                state.minutesInput = null;
                state.secondsInput = null;
                state.newTimer = null;
            } else {
                state.minutesInput = initialMinutes;
                state.secondsInput = initialSeconds;
                state.newTimer = initialMinutes * 60 + initialSeconds;
            }
            state.infiniteSeconds = !state.infiniteSeconds;
        },
    }
});

export const getBlackNameInput = (state: RootState): string => state.newGame.blackNameInput;
export const getWhiteNameInput = (state: RootState): string => state.newGame.whiteNameInput;
export const getInfiniteSeconds = (state: RootState): boolean => state.newGame.infiniteSeconds;
export const getMinutesInput = (state: RootState): timerType => state.newGame.minutesInput;
export const getSecondsInput = (state: RootState): timerType => state.newGame.secondsInput;
export const getNewTimer = (state: RootState): timerType => state.newGame.newTimer;
export const {setBlackNameInput, setWhiteNameInput, setInfiniteSeconds,
    setMinutesInput, setSecondsInput, setNewTimer} = newGameSlice.actions;

export default newGameSlice.reducer;