import * as _ from 'lodash';
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

export class TransactionSubmitModel{
    
    //submitDate = Date.now();
    submitPerson = null;
    action = null;
    submitName = null;
    description = null;
    indexes = null;
    dataType = null;
    submitVersion = null;
    converters = {
        submitPerson: val=>parseInt(val)
    }
    

    isValid(){
        let optional = ['indexes', 'description'];
        if (this.submitName && !this.submitName.includes('sde.SDE'));
            optional.push('submitVersion');
        return _isValid.call(this, optional);
    }
    stringify(){
        return _stringify.call(this);
    }
}

export class TransactionReviewModel{
    //reviewDate = Date.now();
    reviewPerson = null;
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
    sdePerson = null;
    submitName = null;
    prePopulate(cur,fn){
        return _prePopulate.call(this,cur,fn);
    }
    isValid(){
        return _isValid.call(this);
    }
}