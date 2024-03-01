import type { GameSettingsSchema } from './gameSettingsSlice';
import type { RootState } from '../../store';

export const getAreSounds = (state: RootState): GameSettingsSchema['areSounds'] => state.gameSettings.areSounds;
export const getIsBoardReversed =
    (state: RootState): GameSettingsSchema['isBoardReversed'] => state.gameSettings.isBoardReversed;
export const getBoardReversing =
    (state: RootState): GameSettingsSchema['boardReversing'] => state.gameSettings.boardReversing;
export const getAreCardsReversed =
    (state: RootState): GameSettingsSchema['boardReversing'] => state.gameSettings.areCardsReversed;
