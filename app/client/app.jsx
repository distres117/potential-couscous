import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Router from './components/router';
import ES6Promise from 'es6-promise';
import getStore from './redux/store';
ES6Promise.polyfill();

ReactDOM.render(
    <Provider store={getStore()}>
        <Router/>
    </Provider>,
    document.getElementById('app')
)
