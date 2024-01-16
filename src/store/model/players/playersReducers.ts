import type { PlayersSchema } from './playersSchema';
import type { PayloadAction } from '@reduxjs/toolkit';

export const playersReducers = {
    setNames(state: PlayersSchema, action: PayloadAction<Pick<PlayersSchema, 'blackName' | 'whiteName'>>) {
        state.blackName = action.payload.blackName;
        state.whiteName = action.payload.whiteName;
    }
};
