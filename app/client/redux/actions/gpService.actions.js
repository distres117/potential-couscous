import types from './action.types';
import {getDetailsGp} from '../../services/arcpyService';

export const startGetReadyToLoad = ()=>{
    return (dispatch, getState)=>{
        if (getState().readyToLoad.loaded)
            return;
        getDetailsGp()
        .then(res=>{
            dispatch({
                type:types.READY_TO_LOAD,
                payload: res
            });
        })
    }
}
export const noWork = ()=>{
    return {
        type: 'THIS NO WORK',
        payload: true
    };
}