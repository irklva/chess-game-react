import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {playersReducer} from "./model/players/playersSlice";
import {modalsReducer} from "./model/modal/modalsSlice";
import {timersReducer} from "./model/timers/timersSlice";
import {newGameReducer} from "./model/new-game/newGameSlice";

const rootReducers = combineReducers({
    players: playersReducer,
    modals: modalsReducer,
    timers: timersReducer,
    newGame: newGameReducer
});

export default configureStore({
    reducer: rootReducers
});

export type RootState = ReturnType<typeof rootReducers>;