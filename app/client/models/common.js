import getStore from '../redux/store';

export function getCurrentUser(){
    let state = getStore().getState();
        if (state.currentUser)
            return state.currentUser;
        return null;
}
export function _prePopulate(cur, fn){
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
export function _isValid(optionalFields=[]){
    let instance = this;
    return _.difference(_.keys(instance), optionalFields).every(k=>instance[k]!==null && instance[k]!== '' );
}
export function _stringify(){
    let arr = [];
    _.without(_.keys(this),'converters').forEach(k=>{
        if (this[k]!== null){
            let val = this.converters[k] ? this.converters[k](this[k]) : `\"${this[k]}\"`;
            arr.push(`${k}:${val}`);
        }
    },this);
    return arr.join(", ");
}
export function wrapString(str){
    return `\"${str}\"`;
}