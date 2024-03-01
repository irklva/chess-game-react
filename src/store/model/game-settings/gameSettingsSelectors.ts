import type { GameSettingsSchema } from './gameSettingsSlice';
import type { RootState } from '../../store';

export const getAreSounds = (state: RootState): GameSettingsSchema['areSounds'] => state.gameSettings.areSounds;
export const getIsBoardReversed =
    (state: RootState): GameSettingsSchema['isBoardReversed'] => state.gameSettings.isBoardReversed;
