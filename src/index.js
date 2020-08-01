import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {combineReducers,createStore,applyMiddleware} from 'redux';
import loginReducer from './store/reducers/login';
import locationReducer from './store/reducers/location';
import {composeWithDevTools} from 'redux-devtools-extension';
import Thunk from 'redux-thunk';
import {Provider} from 'react-redux';
const rootReducer = combineReducers({
  login:loginReducer,
  location:locationReducer
})
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(Thunk)));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
