import type { ModalsSchema } from './modalsSchema';
import type { PayloadAction } from '@reduxjs/toolkit';

export const modalsReducers = {
    setModalNewGame(state: ModalsSchema, action: PayloadAction<ModalsSchema['modalNewGame']>) {
        state.modalNewGame = action.payload;
    },
    setModalGameOver(state: ModalsSchema, action: PayloadAction<ModalsSchema['modalGameOver']>) {
        state.modalGameOver = action.payload;
    },
    setModalPromotePawn(state: ModalsSchema, action: PayloadAction<ModalsSchema['modalPromotePawn']>) {
        state.modalPromotePawn = action.payload;
    }
};
