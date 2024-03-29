import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GameSettingsSchema {
    areSounds: boolean;
    isBoardReversed: boolean;
    boardReversing: boolean;
    areCardsReversed: boolean;
}

const initialState: GameSettingsSchema = {
    areSounds: true,
    isBoardReversed: false,
    boardReversing: false,
    areCardsReversed: false,
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
        setBoardReversing(state: GameSettingsSchema, action: PayloadAction<boolean>) {
            state.boardReversing = action.payload;
            if (action.payload) {
                state.areCardsReversed = !state.areCardsReversed;
            }
        },
    },
});

export const { setSounds, setIsBoardReversed, setBoardReversing } = gameSettingsSlice.actions;

export const gameSettingsReducer = gameSettingsSlice.reducer;
