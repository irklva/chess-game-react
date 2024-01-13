import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import store from "./store/store";
import BoardProvider from "./board-context/BoardProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BoardProvider>
                <App/>
            </BoardProvider>
        </Provider>
    </React.StrictMode>
);
