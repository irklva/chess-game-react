import type { GameSettingsSchema } from './gameSettingsSlice';
import type { RootState } from '../../store';

export const getGameSounds = (state: RootState): GameSettingsSchema['sounds'] => state.gameSettings.sounds;
