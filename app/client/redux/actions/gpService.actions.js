import types from './action.types';
import {getList} from '../../services/arcpyService';
import {toastr} from 'react-redux-toastr';

export const startGetReadyToLoad = ()=>{
    return (dispatch, getState)=>{
        if (getState().readyToLoad.loaded)
            return;
        getList()
        .then(res=>{
            dispatch({
                type:types.READY_TO_LOAD,
                payload: res.data.data
            });
        })
        .catch(err=>{
            toastr.error('Uh-oh', err);
            return;
            // dispatch({
            //     type:types.READY_TO_LOAD,
            //     payload: {loaded:true}
            // });
        });
    }
}
export const noWork = ()=>{
    return {
        type: 'THIS NO WORK',
        payload: true
    };
}