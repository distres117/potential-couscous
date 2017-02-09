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
    converters = {};

    prePopulate(cur,fn, clearFn){
        return _prePopulate.call(this,cur,fn, clearFn);
    }
    isValid(){
        let required = ['firstName', 'lastName', 'eMail'];
        return _isValid.call(this,null, required);
    }
    stringify(){
        return _stringify.call(this);
    }

}