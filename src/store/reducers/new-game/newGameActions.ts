import {initialMinutes, initialSeconds} from "../../../utils/newGameConstants";
import {timerType} from "../../../types/types";
import {PayloadAction} from "@reduxjs/toolkit";

export interface NewGameState {
    blackNameInput: string;
    whiteNameInput: string;
    infiniteSeconds: boolean;
    minutesInput: timerType;
    secondsInput: timerType;
    newTimer: timerType;
}

export const newGameActions =  {
    setBlackNameInput(state: NewGameState, action: PayloadAction<NewGameState['blackNameInput']>) {
    state.blackNameInput = action.payload;
},
setWhiteNameInput(state: NewGameState, action: PayloadAction<NewGameState['whiteNameInput']>) {
    state.whiteNameInput = action.payload;
},
setMinutesInput(state: NewGameState, action: PayloadAction<NewGameState['minutesInput']>) {
    state.minutesInput = action.payload;
},
setSecondsInput(state: NewGameState, action: PayloadAction<NewGameState['secondsInput']>) {
    state.secondsInput = action.payload;
},
setNewTimer(state: NewGameState, action: PayloadAction<NewGameState['newTimer']>) {
    state.newTimer = action.payload;
},
setInfiniteSeconds(state: NewGameState) {
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