import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as redux from 'redux';
import thunk from 'redux-thunk';
import Router from './components/router';
import reducers from './redux/reducers';
require('bootstrap');
const store = redux.createStore(reducers,{},
    redux.compose(redux.applyMiddleware(thunk), window.devToolsExtension()));

ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>,
    document.getElementById('app')
)
