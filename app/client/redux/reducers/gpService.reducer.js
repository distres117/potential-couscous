import types from '../actions/action.types';
export const gpServiceReducer = (state={}, action)=>{
    switch(action.type){
        case types.READY_TO_LOAD:
            return {
                featureClasses: [...action.payload.featureClasses],
                rasters: [...action.payload.rasters],
                tables: [...action.payload.tables]
            };
        default:
            return state;
    }
}