import {configureStore} from "@reduxjs/toolkit";
import playersReducer from "./reducers/playersSlice";
import modalsReducer from "./reducers/modalsSlice";
import timersReducer from "./reducers/timersSlice";

export default configureStore({
    reducer: {
        players: playersReducer,
        modals: modalsReducer,
        timers: timersReducer
    }
})