import {createSlice} from "@reduxjs/toolkit";
import {initialMinutes, initialSeconds} from "../../../utils/newGameConstants";
import {newGameActions} from "./newGameActions";
import {NewGameSchema} from "./newGameSchema";

const initialState: NewGameSchema = {
    blackNameInput: 'Black',
    whiteNameInput: 'White',
    infiniteSeconds: false,
    minutesInput: initialMinutes,
    secondsInput: initialSeconds,
}

const newGameSlice = createSlice({
    name: 'newGame',
    initialState,
    reducers: newGameActions,
});

export const {setBlackNameInput, setWhiteNameInput, setInfiniteSeconds,
    setMinutesInput, setSecondsInput} = newGameSlice.actions;

export const newGameReducer = newGameSlice.reducer;