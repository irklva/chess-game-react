import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface PlayersState {
    blackName: string;
    whiteName: string;
}

const initialState: PlayersState = {
    blackName: "Black",
    whiteName: "White"
}

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setNames(state, action) {
            state.blackName = action.payload.blackName;
            state.whiteName = action.payload.whiteName;
        }
    }
});

export const getBlackName = (state: RootState): string => state.players.blackName;
export const getWhiteName = (state: RootState): string => state.players.whiteName;
export const {setNames} = playersSlice.actions;

export default playersSlice.reducer;