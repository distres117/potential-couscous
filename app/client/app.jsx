import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as redux from 'redux';
import thunk from 'redux-thunk';
import TestComponent from './components/test';
import TransactionSubmit from './components/transactions/submit.component';
import reducers from './redux/reducers';
require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');

const store = redux.createStore(reducers,{},
    redux.compose(redux.applyMiddleware(thunk), window.devToolsExtension()));

ReactDOM.render(
    <Provider store={store}>
        <TransactionSubmit/>
    </Provider>,
    document.getElementById('app')
)
