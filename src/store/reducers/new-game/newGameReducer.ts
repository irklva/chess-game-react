import {createSlice} from "@reduxjs/toolkit";
import {initialMinutes, initialSeconds} from "../../../utils/newGameConstants";
import {newGameActions, NewGameState} from "./newGameActions";

const initialState: NewGameState = {
    blackNameInput: 'Black',
    whiteNameInput: 'White',
    infiniteSeconds: false,
    minutesInput: initialMinutes,
    secondsInput: initialSeconds,
    newTimer: initialMinutes * 60,
}

const newGameReducer = createSlice({
    name: 'newGame',
    initialState,
    reducers: newGameActions,
});

export const {setBlackNameInput, setWhiteNameInput, setInfiniteSeconds,
    setMinutesInput, setSecondsInput, setNewTimer} = newGameReducer.actions;

export default newGameReducer.reducer;