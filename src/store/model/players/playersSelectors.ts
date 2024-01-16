import type { PlayersSchema } from './playersSchema';
import type { RootState } from '../../store';

export const getBlackName = (state: RootState): PlayersSchema['blackName'] => state.players.blackName;
export const getWhiteName = (state: RootState): PlayersSchema['whiteName'] => state.players.whiteName;
