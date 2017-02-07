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

    prePopulate(cur,fn){
        return _prePopulate.call(this,cur,fn);
    }
    isValid(){
        let optional = ['title', 'middleName', 'extension', 'notes'];
        return _isValid.call(this, optional);
    }
    stringify(){
        return _stringify.call(this);
    }

}