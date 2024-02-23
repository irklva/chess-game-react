import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { gameSettingsReducer } from './model/game-settings/gameSettingsSlice';
import { modalsReducer } from './model/modal/modalsSlice';
import { newGameReducer } from './model/new-game/newGameSlice';
import { playersReducer } from './model/players/playersSlice';
import { timersReducer } from './model/timers/timersSlice';

const rootReducers = combineReducers({
    players: playersReducer,
    modals: modalsReducer,
    timers: timersReducer,
    newGame: newGameReducer,
    gameSettings: gameSettingsReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

export function createReduxStore(
    initialState?: RootState,
) {
    return configureStore({
        reducer: rootReducers,
        preloadedState: initialState,
    });
}

const store = createReduxStore();

export default store;

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
