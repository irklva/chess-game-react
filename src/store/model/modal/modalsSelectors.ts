import type { ModalsSchema } from './modalsSchema';
import type { RootState } from '../../store';

export const getModalNewGame = (state: RootState): ModalsSchema['modalNewGame'] => state.modals.modalNewGame;
export const getModalGameOver = (state: RootState): ModalsSchema['modalGameOver'] => state.modals.modalGameOver;
export const getModalPromotePawn = (state: RootState): ModalsSchema['modalNewGame'] => state.modals.modalPromotePawn;
