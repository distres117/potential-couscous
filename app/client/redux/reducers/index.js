import {gpServiceReducer} from './gpService.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
   readyToLoad:gpServiceReducer 
});