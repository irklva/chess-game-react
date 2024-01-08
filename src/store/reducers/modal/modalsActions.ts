import {PayloadAction} from "@reduxjs/toolkit";

export interface ModalsState {
    modalNewGame: boolean;
    modalGameOver: boolean;
    modalPromotePawn: boolean;
}

export const modalsActions =  {
    setModalNewGame(state: ModalsState, action: PayloadAction<ModalsState['modalNewGame']>) {
        state.modalNewGame = action.payload;
    },
    setModalGameOver(state: ModalsState, action: PayloadAction<ModalsState['modalGameOver']>) {
        state.modalGameOver = action.payload;
    },
    setModalPromotePawn(state: ModalsState, action: PayloadAction<ModalsState['modalPromotePawn']>) {
        state.modalPromotePawn = action.payload;
    }
}