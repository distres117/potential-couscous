import {getCurrentUser,_prePopulate,_isValid,_stringify, wrapString} from './common';

export class PersonModel{
    title = null;
    firstName = null;
    middleName = null;
    lastName = null;
    position = null;
    organizationId = null;
    division = null;
    contractor = null;
    address1 = null;
    address2 = null;
    city = null;
    state = null;
    zip = null;
    phone = null;
    extension = null;
    eMail = null;
    notes = null;

    prePopulate(cur,fn, clearFn){
        return _prePopulate.call(this,cur,fn, clearFn);
    }
    isValid(){
        let required = ['firstName', 'lastName', 'eMail', 'organizationId'];
        return _isValid.call(this,null, required);
    }
    stringify(){
        return _stringify.call(this);
    }
    getConverters(){
        return {
            organizationId: val=>parseInt(val),
            state: val=>parseInt(val)
        }
    }

}