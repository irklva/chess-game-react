import { createSlice } from '@reduxjs/toolkit';

export interface GameSettingsSchema {
    sounds: boolean;
}

const initialState: GameSettingsSchema = { sounds: true };

export const gameSettingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    reducers: {
        setSounds(state: GameSettingsSchema) {
            state.sounds = !state.sounds;
        },
    },
});

export const { setSounds } = gameSettingsSlice.actions;

export const gameSettingsReducer = gameSettingsSlice.reducer;
