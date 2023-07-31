import {combineReducers, configureStore} from "@reduxjs/toolkit";
import playersReducer from "./reducers/playersSlice";
import modalsReducer from "./reducers/modalsSlice";
import timersReducer from "./reducers/timersSlice";

const rootReducers = combineReducers({
    players: playersReducer,
    modals: modalsReducer,
    timers: timersReducer
})

export default configureStore({
    reducer: rootReducers
})

export type RootState = ReturnType<typeof rootReducers>;