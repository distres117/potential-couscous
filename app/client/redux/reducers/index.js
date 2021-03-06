import {gpServiceReducer} from './gpService.reducer';
import {peopleReducer, tableDataReducer, summaryDataReducer, statesReducer, orgTypesReducer, catalogReducer, transmittalsReducer,typesReducer} from './db.reducer';
import {currentRecordReducer, transactionReducer, searchReducer, versionsReducer, longProcessReducer, appUserReducer, organizationsReducer, queryReducer, domainCategoryReducer} from './app.reducers';
import {combineReducers} from 'redux';
import {reducer as toastReducer} from 'react-redux-toastr';

export default combineReducers({
   readyToLoad:gpServiceReducer,
   catalogRows: catalogReducer,
   people: peopleReducer,
   states: statesReducer,
   orgTypes: orgTypesReducer,
   organizations: organizationsReducer,
   tableData: tableDataReducer,
   current: currentRecordReducer,
   transaction: transactionReducer,
   toastr: toastReducer,
   searchResult:searchReducer,
   versions:versionsReducer,
   processing:longProcessReducer,
   currentUser: appUserReducer,
   summaryData: summaryDataReducer, 
   domainTypes: typesReducer,
   transmittalTypes: transmittalsReducer,
   dataQuery: queryReducer,
   domainCategories: domainCategoryReducer,
   clicked: (state=false, action)=>{
       if (action.type === 'THIS NO WORK')
            return action.payload;
        return state;
   } 
});