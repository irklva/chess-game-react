import {createSlice} from "@reduxjs/toolkit";

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
        setBlackName(state, action) {
            state.blackName = action.payload;
        },
        setWhiteName(state, action) {
            state.whiteName = action.payload;
        }
    }
});

export const getBlackName = (state: any) => state.players.blackName;
export const getWhiteName = (state: any) => state.players.whiteName;
export const {setBlackName, setWhiteName} = playersSlice.actions;

export default playersSlice.reducer;