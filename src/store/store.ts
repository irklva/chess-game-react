import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { modalsReducer } from './model/modal/modalsSlice';
import { newGameReducer } from './model/new-game/newGameSlice';
import { playersReducer } from './model/players/playersSlice';
import { timersReducer } from './model/timers/timersSlice';

const rootReducers = combineReducers({
    players: playersReducer,
    modals: modalsReducer,
    timers: timersReducer,
    newGame: newGameReducer
});

export default configureStore({ reducer: rootReducers });

export type RootState = ReturnType<typeof rootReducers>;
