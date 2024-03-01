import { createSlice } from '@reduxjs/toolkit';

export interface GameSettingsSchema {
    areSounds: boolean;
    isBoardReversed: boolean;
}

const initialState: GameSettingsSchema = {
    areSounds: true,
    isBoardReversed: false,
};

export const gameSettingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    reducers: {
        setSounds(state: GameSettingsSchema) {
            state.areSounds = !state.areSounds;
        },
        setIsBoardReversed(state: GameSettingsSchema) {
            state.isBoardReversed = !state.isBoardReversed;
        },
    },
});

export const { setSounds, setIsBoardReversed } = gameSettingsSlice.actions;

export const gameSettingsReducer = gameSettingsSlice.reducer;
