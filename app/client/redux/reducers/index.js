import {gpServiceReducer} from './gpService.reducer';
import {peopleReducer, tableDataReducer} from './db.reducer';
import {currentRecordReducer, transactionReducer} from './app.reducers';
import {combineReducers} from 'redux';
import {reducer as toastReducer} from 'react-redux-toastr';

export default combineReducers({
   readyToLoad:gpServiceReducer,
   people: peopleReducer,
   tableData: tableDataReducer,
   current: currentRecordReducer,
   transaction: transactionReducer,
   toastr: toastReducer,
   clicked: (state=false, action)=>{
       if (action.type === 'THIS NO WORK')
            return action.payload;
        return state;
   } 
});