import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import BoardProvider from './board-context/BoardProvider';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <Provider store={store}>
            <BoardProvider>
                <App/>
            </BoardProvider>
        </Provider>
    </StrictMode>,
);
