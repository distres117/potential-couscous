import getStore from '../redux/store';
import * as _ from 'lodash';

export default class FormModel{

    isNull(){
        return Object.keys(this).every(k=>this[k]===null || this[k]=== undefined )
    }
    getCurrentUser(){
        let state = getStore().getState();
            if (state.currentUser)
                return state.currentUser;
            //console.log(state.currentUser);
            return null;
    }
    _prePopulate(refs, cur){
        if (cur && Object.keys(cur).length){
            let instance = this;
            Object.keys(instance).forEach(k=>{
                if (cur[k] !== null){
                    instance[k]=cur[k];
                }
            });
        }
        if (refs)
            this._emit.call(this,refs);
    }
    _emit(refs){
        let instance = this;
        Object.keys(refs).forEach(k=>{
            refs[k].value = _.isNil(instance[k]) || instance[k]==='' ? '': instance[k];
        });
    }

    _isValid(optionalFields, requiredFields){
        let instance = this;
        let fields = requiredFields || Object.keys(instance);
        if (optionalFields)
            fields = fields.filter(f=>!optionalFields.includes(f));
        let result = fields.every(k=> instance[k] !== undefined && instance[k] !== '' && instance[k] !== null);
        return result;
    }
     _stringify(converters){
        let arr = [];
        _.keys(this).forEach(k=>{
            if (this[k]!== null && this[k] !== undefined){
                let val = converters[k] ? converters[k](this[k]) : `\"${this[k]}\"`;
                arr.push(`${k}:${val}`);
            }
        },this);
        return arr.join(", ");
    }
    wrapString(str){
        return `\"${str}\"`;
    }
}

