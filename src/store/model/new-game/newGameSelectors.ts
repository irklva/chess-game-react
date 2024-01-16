import { createSelector } from '@reduxjs/toolkit';
import type { NewGameSchema } from './newGameSchema';
import type { RootState } from '../../store';

export const getBlackNameInput = (state: RootState): NewGameSchema['blackNameInput'] => state.newGame.blackNameInput;
export const getWhiteNameInput = (state: RootState): NewGameSchema['whiteNameInput'] => state.newGame.whiteNameInput;
export const getInfiniteSeconds = (state: RootState): NewGameSchema['infiniteSeconds'] => state.newGame.infiniteSeconds;
export const getMinutesInput = (state: RootState): NewGameSchema['minutesInput'] => state.newGame.minutesInput;
export const getSecondsInput = (state: RootState): NewGameSchema['secondsInput'] => state.newGame.secondsInput;
export const getNewGameTimer = createSelector(
    getMinutesInput,
    getSecondsInput,
    (minutes, seconds) => {
        if (minutes !== null && seconds !== null) {
            return (minutes * 60 + seconds);
        } else {
            return null;
        }
    }
);
