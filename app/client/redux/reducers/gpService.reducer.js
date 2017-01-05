import types from '../actions/action.types';

class ReadyToLoadModel{
    featureClasses= [];
    rasters = [];
    tables = [];
    loaded = false;
}
export const gpServiceReducer = (state=new ReadyToLoadModel(), action)=>{
    switch(action.type){
        case types.READY_TO_LOAD:
            let model = new ReadyToLoadModel();
                model.featureClasses = [...action.payload.featureClasses],
                model.rasters= [...action.payload.rasters],
                model.tables=[...action.payload.tables]
                model.loaded = true;
            return model;
        default:
            return state;
    }
}