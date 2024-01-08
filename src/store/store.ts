import {combineReducers, configureStore} from "@reduxjs/toolkit";
import playersReducer from "./reducers/players/playersReducer";
import modalsReducer from "./reducers/modal/modalsReducer";
import timersReducer from "./reducers/timers/timersReducer";
import newGameReducer from "./reducers/new-game/newGameReducer";

const rootReducers = combineReducers({
    players: playersReducer,
    modals: modalsReducer,
    timers: timersReducer,
    newGame: newGameReducer
})

export default configureStore({
    reducer: rootReducers
})

export type RootState = ReturnType<typeof rootReducers>;