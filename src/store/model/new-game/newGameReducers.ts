import { initialMinutes, initialSeconds } from '../../../utils/newGameConstants';
import type { NewGameSchema } from './newGameSchema';
import type { PayloadAction } from '@reduxjs/toolkit';

export const newGameReducers = {
    setBlackNameInput(state: NewGameSchema, action: PayloadAction<NewGameSchema['blackNameInput']>) {
        state.blackNameInput = action.payload;
    },
    setWhiteNameInput(state: NewGameSchema, action: PayloadAction<NewGameSchema['whiteNameInput']>) {
        state.whiteNameInput = action.payload;
    },
    setMinutesInput(state: NewGameSchema, action: PayloadAction<NewGameSchema['minutesInput']>) {
        state.minutesInput = action.payload;
    },
    setSecondsInput(state: NewGameSchema, action: PayloadAction<NewGameSchema['secondsInput']>) {
        state.secondsInput = action.payload;
    },
    setInfiniteSeconds(state: NewGameSchema) {
        if (!state.infiniteSeconds) {
            state.minutesInput = null;
            state.secondsInput = null;
        } else {
            state.minutesInput = initialMinutes;
            state.secondsInput = initialSeconds;
        }
        state.infiniteSeconds = !state.infiniteSeconds;
    },
};
