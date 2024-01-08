import {createSlice} from "@reduxjs/toolkit";
import {modalsActions, ModalsState} from "./modalsActions";

const initialState: ModalsState = {
    modalNewGame: true,
    modalGameOver: false,
    modalPromotePawn: false,
}

export const modalsReducer = createSlice({
    name: 'modals',
    initialState,
    reducers: modalsActions,
});

export const {setModalNewGame, setModalGameOver, setModalPromotePawn} = modalsReducer.actions;

export default modalsReducer.reducer;