import {createSlice} from "@reduxjs/toolkit";
import {playersActions} from "./playersActions";
import {PlayersSchema} from "./playersSchema";

const initialState: PlayersSchema = {
    blackName: "Black",
    whiteName: "White",
}

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: playersActions,
});

export const {setNames} = playersSlice.actions;

export const playersReducer = playersSlice.reducer;