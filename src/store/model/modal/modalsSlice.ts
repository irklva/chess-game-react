import {createSlice} from "@reduxjs/toolkit";
import {modalsReducers} from "./modalsReducers";
import {ModalsSchema} from "./modalsSchema";

const initialState: ModalsSchema = {
    modalNewGame: true,
    modalGameOver: false,
    modalPromotePawn: false,
}

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: modalsReducers,
});

export const {setModalNewGame, setModalGameOver, setModalPromotePawn} = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;