import * as _ from 'lodash';
import getStore from '../redux/store';

function getCurrentUser(){
    let state = getStore().getState();
        if (state.currentUser)
            return state.currentUser;
        return null;
}
function _prePopulate(cur, fn){
        if (!Object.keys(cur).length)
            return;
        let instance = this;
        Object.keys(cur).forEach(k=>{
            if(instance.hasOwnProperty(k) && cur.hasOwnProperty(k)){
                if (fn)
                    fn(cur[k],instance[k]);
                else if (cur[k] !== null)
                    instance[k]=cur[k];
                    
            }
        });
    }
function _isValid(optionalFields=[]){
    let instance = this;
    return _.difference(_.keys(instance), optionalFields).every(k=>instance[k]!==null && instance[k]!== '' );
}
function _stringify(){
    let arr = [];
    _.without(_.keys(this),'converters').forEach(k=>{
        if (this[k]!== null){
            let val = this.converters[k] ? this.converters[k](this[k]) : `\"${this[k]}\"`;
            arr.push(`${k}:${val}`);
        }
    },this);
    return arr.join(", ");
}
function wrapString(str){
    return `\"${str}\"`;
}

export class TransactionSubmitModel{
    //submitDate = Date.now();
    submitPerson = getCurrentUser();
    action = null;
    submitName = null;
    description = null;
    indexes = null;
    dataType = null;
    submitVersion = null;
    converters = {
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
    prePopulate(cur,fn){
        return _prePopulate.call(this,cur,fn);
    }
    isValid(){
        let optional = ['indexes', 'description'];
        if (this.submitName && this.submitName.indexOf('sde.SDE') > -1);
            optional.push('submitVersion');
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
    converters = {
        reviewPerson: val=>parseInt(val),
        passed: val=>parseInt(val)
        //reviewDate: val=>parseInt(val)
    };

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
    converters = {
        sdePerson: val=>parseInt(val)
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