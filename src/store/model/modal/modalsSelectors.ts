import {RootState} from "../../store";
import {ModalsSchema} from "./modalsSchema";

export const getModalNewGame = (state: RootState): ModalsSchema['modalNewGame'] => state.modals.modalNewGame;
export const getModalGameOver = (state: RootState): ModalsSchema['modalGameOver'] => state.modals.modalGameOver;
export const getModalPromotePawn = (state: RootState): ModalsSchema['modalNewGame'] => state.modals.modalPromotePawn;