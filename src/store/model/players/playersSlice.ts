import { createSlice } from '@reduxjs/toolkit';
import { playersReducers } from './playersReducers';
import type { PlayersSchema } from './playersSchema';

const initialState: PlayersSchema = {
    blackName: 'Black',
    whiteName: 'White',
};

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: playersReducers,
});

export const { setNames } = playersSlice.actions;

export const playersReducer = playersSlice.reducer;
