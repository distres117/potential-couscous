import {gpServiceReducer} from './gpService.reducer';
import {peopleReducer} from './db.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
   readyToLoad:gpServiceReducer,
   people: peopleReducer,
   clicked: (state=false, action)=>{
       if (action.type === 'THIS NO WORK')
            return action.payload;
        return state;
   } 
});