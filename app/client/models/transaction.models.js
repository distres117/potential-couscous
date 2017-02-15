import * as _ from 'lodash';
import FormModel from './common';

export class TransactionSubmitModel extends FormModel{
    //submitDate = null;
    submitPerson = null;
    action = null;
    submitName = null;
    description = null;
    indexes = null;
    dataType = null;
    submitVersion = null;
    
    prePopulate(cur,fn){
        return super._prePopulate.call(this,cur,fn);
    }
    isValid(){
        let optional = ['indexes', 'description','submitVersion'];
        if (this.submitName && this.submitName.includes('sde.SDE'))
            optional.pop();
        return super._isValid.call(this, optional);
    }
    stringify(){
        return super._stringify.call(this, this.getCoverters());
    }
    getCoverters(){
        return {
            submitPerson: val=>parseInt(val),
            dataType: val=>{
                let lookup = {
                    featureClasses: super.wrapString(1),
                    rasters: super.wrapString(2),
                    tables: super.wrapString(3)
                };
                return lookup[val];
            }
        }
    }
}

export class TransactionReviewModel extends FormModel{
    //reviewDate = Date.now();
    reviewPerson = null;
    reviewNotes = null;
    passed = null;
    
    getConverters(){
        return {
            reviewPerson: val=>parseInt(val),
            passed: val=>parseInt(val)
        }
    }

    prePopulate(cur,fn){
        return super._prePopulate.call(this,cur,fn);
    }
    isValid(){
        return super._isValid.call(this, ['reviewNotes']);
    }
    stringify(){
        return super._stringify.call(this, this.getConverters());
    }

    

}

export class TransactionLoadModel extends FormModel{
    //loadDate = Date.now();
    sdePerson = null;
    submitName = null;
    
    getConverters(){
        return {
            sdePerson: val=>parseInt(val)
        };
    }
    prePopulate(cur,fn){
        return super._prePopulate.call(this,cur,fn);
    }
    isValid(){
        return super._isValid.call(this);
    }
    stringify(){
        return super._stringify.call(this, this.getConverters());
    }
}