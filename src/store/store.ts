import {combineReducers, configureStore} from "@reduxjs/toolkit";
import playersSlice from "./reducers/playersSlice";
import modalsSlice from "./reducers/modalsSlice";
import timersSlice from "./reducers/timersSlice";
import newGameSlice from "./reducers/newGameSlice";

const rootReducers = combineReducers({
    players: playersSlice,
    modals: modalsSlice,
    timers: timersSlice,
    newGame: newGameSlice
})

export default configureStore({
    reducer: rootReducers
})

export type RootState = ReturnType<typeof rootReducers>;