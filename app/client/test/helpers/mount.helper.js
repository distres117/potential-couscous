import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../../redux/reducers';
import thunk from 'redux-thunk';
import * as redux from 'redux';
import {mount as _mount, shallow as _shallow} from 'enzyme';
import React from 'react';
import {stub} from 'sinon';
import chai from 'chai';
import chaiDispatch from '../helpers/chai-dispatch';
chai.use(chaiDispatch);

function attach(obj,fn, blockDispatch, dispatchArray){
    stub(obj,'dispatch',(arg)=>{
        let argStr = arg.toString();
        let isAsync = argStr.includes('.then');
        if (blockDispatch || isAsync){ //catch all async dispatches
            let fn = (match)=>{
                let matchIsAsync = match.toString().includes('.then');
                let matchArg = matchIsAsync ? match.toString().replace(' ','') : JSON.stringify(match());
                let thisArg =  isAsync ? argStr.replace(' ','') : JSON.stringify(arg);
                if (matchIsAsync)
                    return matchArg.includes(thisArg);
                return matchArg === thisArg;
            }
            dispatchArray.push(fn);
        }
        return arg;
    });
}
export const mount = (_ComponentClass, state, blockDispatch = true)=>{
    const ComponentClass = _ComponentClass.WrappedComponent
    const dispatchArray = [];
    const store = createStore(reducers, state, redux.compose(redux.applyMiddleware(thunk)));
    attach(store, 'dispatch',blockDispatch, dispatchArray);
    const wrapped = _mount(
       <Provider store={store}>
            <ComponentClass {...state} dispatch={store.dispatch} />
       </Provider> 
    );
    wrapped.dispatchArray = dispatchArray
    return wrapped;
};

export const shallow = (_ComponentClass,state,blockDispatch = true)=>{
    const ComponentClass = _ComponentClass.WrappedComponent
    const dispatchArray = [];
    const store = {dispatch:s=>s};
    attach(store, 'dispatch', blockDispatch,dispatchArray);
    const wrapped = _shallow(<ComponentClass {...state} dispatch={store.dispatch}/>);
    wrapped.dispatchArray = dispatchArray;
    return wrapped;
}
