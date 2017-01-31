import reducers from './reducers';
import * as redux from 'redux';
import thunk from 'redux-thunk';

let store;
export default ()=>{
    if (!store)
        store = redux.createStore(reducers,{},redux.compose(redux.applyMiddleware(thunk)));
    return store;
}
