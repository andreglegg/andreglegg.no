import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import portfilio from './store/reducers/portfolio'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(portfilio, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
            <App/>
    </Provider>
);

console.log('ReactJs version: ' + React.version);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
