function _prePopulate(cur, fn){
        if (!Object.keys(cur).length)
            return;
        let instance = this;
        Object.keys(cur).forEach(k=>{
            if(instance[k]!== undefined && cur[k] !==undefined){
                if (fn)
                    fn(cur[k],instance[k]);
                else
                    instance[k] = cur[k]
            }
        });
    }
function _isValid(optionalFields=[]){
    let instance = this;
    return _.difference(_.keys(instance), optionalFields).every(k=>instance[k]!==null && instance[k]!== '' );
}

export class TransactionSubmitModel{
    
    submitDate = Date.now();
    submitPerson = null;
    action = null;
    submitName = null;
    description = null;
    indexes = null;
    dataType = null;

    isValid(){
        return _isValid.call(this, ['indexes', 'description']);
    }
}

export class TransactionReviewModel{
    reviewDate = Date.now();
    reviewPerson = null;
    reviewNotes = null;
    passed = null;

    prePopulate(cur,fn){
        return _prePopulate.call(this,cur,fn);
    }
    isValid(){
        return _isValid.call(this, ['reviewNotes']);
    }

    

}

export class TransactionLoadModel{
    loadDate = Date.now();
    sdePerson = null;
    submitName = null;
    prePopulate(cur,fn){
        return _prePopulate.call(this,cur,fn);
    }
    isValid(){
        return _isValid.call(this);
    }
}