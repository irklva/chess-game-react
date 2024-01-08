import {PayloadAction} from "@reduxjs/toolkit";

export interface PlayersState {
    blackName: string;
    whiteName: string;
}

export const playersActions = {
    setNames(state: PlayersState, action: PayloadAction<Pick<PlayersState, 'blackName' | 'whiteName'>>) {
        state.blackName = action.payload.blackName;
        state.whiteName = action.payload.whiteName;
    }
}