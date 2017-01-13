function _prePopulate(cur, fn){
        if (!Object.keys(cur).length)
            return;
        let instance = this;
        Object.keys(cur).forEach(k=>{
            if(instance[k]!== undefined){
                if (fn)
                    fn(cur[k],instance[k]);
                else
                    instance[k] = cur[k]
            }
        });
    }

export class TransactionSubmitModel{
    
    submitDate = Date.now();
    submitPerson = null;
    action = null;
    selectData = null;
    description = null;
    indexes = null;
}

export class TransactionReviewModel{
    reviewDate = Date.now();
    reviewPerson = null;
    reviewNotes = null;
    passed = null;

    prePopulate(cur,fn){
        return _prePopulate.call(this,cur,fn);
    }

    

}

export class TransactionLoadModel{
    loadDate = Date.now();
    sdePerson = null;
    dataset = null;
    prePopulate(cur,fn){
        return _prePopulate.call(this,cur,fn);
    }
}