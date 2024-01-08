import {createSlice} from "@reduxjs/toolkit";
import {playersActions, PlayersState} from "./playersActions";

const initialState: PlayersState = {
    blackName: "Black",
    whiteName: "White",
}

const playersReducer = createSlice({
    name: 'players',
    initialState,
    reducers: playersActions,
});

export const {setNames} = playersReducer.actions;

export default playersReducer.reducer;