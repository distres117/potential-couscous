import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as redux from 'redux';
import thunk from 'redux-thunk';
import Router from './components/router';
import reducers from './redux/reducers';

const store = redux.createStore(reducers,{},
    redux.compose(redux.applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>,
    document.getElementById('app')
)
