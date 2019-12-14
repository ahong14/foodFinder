import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import App from './App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
//redux setup
//reference: https://github.com/rt2zz/redux-persist
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'root',
    storage,
}
  
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persistor = persistStore(store);

const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
                <App/>
            </Router>
        </PersistGate>
    </Provider> , 
    document.getElementById('root')
);