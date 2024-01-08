import {RootState} from "../../store";

export const getModalNewGame = (state: RootState): boolean => state.modals.modalNewGame;
export const getModalGameOver = (state: RootState): boolean => state.modals.modalGameOver;
export const getModalPromotePawn = (state: RootState): boolean => state.modals.modalPromotePawn;