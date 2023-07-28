import {createSlice} from "@reduxjs/toolkit";

interface ModalsState {
    modalNewGame: boolean;
    modalGameOver: boolean;
    modalPromotePawn: boolean;
}

const initialState: ModalsState = {
    modalNewGame: true,
    modalGameOver: false,
    modalPromotePawn: false
}

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setModalNewGame(state, action) {
            state.modalNewGame = action.payload;
        },
        setModalGameOver(state, action) {
            state.modalGameOver = action.payload;
        },
        setModalPromotePawn(state, action) {
            state.modalPromotePawn = action.payload;
        }
    }
});

export const getModalNewGame = (state: any) => state.modals.modalNewGame;
export const getModalGameOver = (state: any) => state.modals.modalGameOver;
export const getModalPromotePawn = (state: any) => state.modals.modalPromotePawn;
export const {setModalNewGame, setModalGameOver, setModalPromotePawn} = modalsSlice.actions;

export default modalsSlice.reducer;