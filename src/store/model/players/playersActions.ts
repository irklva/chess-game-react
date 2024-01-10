import {PayloadAction} from "@reduxjs/toolkit";
import {PlayersSchema} from "./playersSchema";

export const playersActions = {
    setNames(state: PlayersSchema, action: PayloadAction<Pick<PlayersSchema, 'blackName' | 'whiteName'>>) {
        state.blackName = action.payload.blackName;
        state.whiteName = action.payload.whiteName;
    }
}