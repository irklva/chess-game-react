import { createSlice } from '@reduxjs/toolkit';
import { initialMinutes, initialSeconds } from '../../../utils/constants';
import { newGameReducers } from './newGameReducers';
import type { NewGameSchema } from './newGameSchema';

const initialState: NewGameSchema = {
    blackNameInput: 'Black',
    whiteNameInput: 'White',
    infiniteSeconds: false,
    minutesInput: initialMinutes,
    secondsInput: initialSeconds,
};

const newGameSlice = createSlice({
    name: 'newGame',
    initialState,
    reducers: newGameReducers,
});

export const {
    setBlackNameInput, setWhiteNameInput, setInfiniteSeconds,
    setMinutesInput, setSecondsInput,
} = newGameSlice.actions;

export const newGameReducer = newGameSlice.reducer;
