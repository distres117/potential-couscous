import {gpServiceReducer} from './gpService.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
   readyToLoad:gpServiceReducer,
   clicked: (state=false, action)=>{
       if (action.type === 'THIS NO WORK')
            return action.payload;
        return state;
   } 
});