import types from './action.types';

export const setCurrentRecordAction = (row)=>{
    return {
        type: types.SET_CURRENT_RECORD,
        payload:row
    }
}