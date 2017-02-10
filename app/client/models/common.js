import getStore from '../redux/store';
import * as _ from 'lodash';

export function isNull(){
    return Object.keys(this).every(k=>this[k]===null || this[k]=== undefined )
}
export function getCurrentUser(){
    let state = getStore().getState();
        if (state.currentUser)
            return state.currentUser;
        return null;
}
export function _prePopulate(refs, cur){
    if (cur && Object.keys(cur).length){
        let instance = this;
        Object.keys(instance).forEach(k=>{
            if (cur[k] !== null){
                instance[k]=cur[k];
            }
        });
    }
    if (refs)
        _emit.call(this,refs);
}
function _emit(refs){
    let instance = this;
    Object.keys(refs).forEach(k=>{
        refs[k].value = instance[k] || '';
    });
}
export function _isValid(optionalFields=[], requiredFields=[]){
    let instance = this;
    if (!optionalFields)
        optionalFields = _.keys(instance);
    return _.concat(_.difference(_.keys(instance), optionalFields),requiredFields).every(k=>instance[k]!==null && instance[k]!== '' );
}
export function _stringify(){
    let arr = [];
    _.keys(this).forEach(k=>{
        if (this[k]!== null && this[k] !== undefined){
            let converters = this.getConverters()
            let val = converters[k] ? converters[k](this[k]) : `\"${this[k]}\"`;
            arr.push(`${k}:${val}`);
        }
    },this);
    return arr.join(", ");
}
export function wrapString(str){
    return `\"${str}\"`;
}