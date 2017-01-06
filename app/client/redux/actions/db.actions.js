import types from '../actions/action.types';

export const startGetAllPeopleAction = ()=>{
    //TODO: make this return actual data from the db
    return {
        type: types.GET_ALL_PEOPLE,
        payload: {
            testPerson1: 1,
            testPerson2: 2,
            testPerson3: 3
        }
    };
}
export const startGetTransactionData = ()=>{
    //TODO: make this return actual from the db
    return {
        type: types.GET_TABLE_DATA,
        payload: [
            ['thing1','thing2','thing3'],
            ['thing4', 'thing5', 'thing6'],
            ['thing7', 'thing8', 'thing9']
        ]
    }
}