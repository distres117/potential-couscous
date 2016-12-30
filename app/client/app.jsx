import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as redux from 'redux';
import thunk from 'redux-thunk';
import TestComponent from './components/test';
import reducers from './redux/reducers'

const store = redux.createStore(reducers,{},
    redux.compose(redux.applyMiddleware(thunk), window.devToolsExtension()));

ReactDOM.render(
    <Provider store={store}>
        <TestComponent/>
    </Provider>,
    document.getElementById('app')
)
