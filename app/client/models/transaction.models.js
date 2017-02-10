import * as _ from 'lodash';
import {getCurrentUser,_prePopulate,_isValid,_stringify, wrapString} from './common';

export class TransactionSubmitModel{
    //submitDate = Date.now();
    submitPerson = getCurrentUser();
    action = null;
    submitName = null;
    description = null;
    indexes = null;
    dataType = null;
    submitVersion = null;
    
    getCoverters(){
        return {
            submitPerson: val=>parseInt(val),
            dataType: val=>{
                let lookup = {
                    featureClasses: wrapString(1),
                    rasters: wrapString(2),
                    tables: wrapString(3)
                };
                return lookup[val];
            }
        }
    }
    prePopulate(cur,fn){
        return _prePopulate.call(this,cur,fn);
    }
    isValid(){
        let optional = ['indexes', 'description','submitVersion'];
        if (this.submitName && this.submitName.includes('sde.SDE'))
            optional.pop();
        return _isValid.call(this, optional);
    }
    stringify(){
        return _stringify.call(this);
    }
}

export class TransactionReviewModel{
    //reviewDate = Date.now();
    reviewPerson = getCurrentUser();
    reviewNotes = null;
    passed = null;
    
    getConverters(){
        return {
            reviewPerson: val=>parseInt(val),
            passed: val=>parseInt(val)
        }
    }

    prePopulate(cur,fn){
        return _prePopulate.call(this,cur,fn);
    }
    isValid(){
        return _isValid.call(this, ['reviewNotes']);
    }
    stringify(){
        return _stringify.call(this);
    }

    

}

export class TransactionLoadModel{
    //loadDate = Date.now();
    sdePerson = getCurrentUser();
    submitName = null;
    
    getConverters(){
        return {
            sdePerson: val=>parseInt(val)
        };
    }
    prePopulate(cur,fn){
        return _prePopulate.call(this,cur,fn);
    }
    isValid(){
        return _isValid.call(this);
    }
    stringify(){
        return _stringify.call(this);
    }
}