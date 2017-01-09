import {gpServiceReducer} from './gpService.reducer';
import {peopleReducer, tableDataReducer} from './db.reducer';
import {currentRecordReducer} from './app.reducers';
import {combineReducers} from 'redux';

export default combineReducers({
   readyToLoad:gpServiceReducer,
   people: peopleReducer,
   tableData: tableDataReducer,
   current: currentRecordReducer,
   clicked: (state=false, action)=>{
       if (action.type === 'THIS NO WORK')
            return action.payload;
        return state;
   } 
});