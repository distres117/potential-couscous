import FormModel from './common';

export class DisbursementModel extends FormModel{
    dataCatalogId = null;
    recipient = null;
    contractor = null;
    provider = null;
    formatId = null;
    transmittalId = null;
    selCriteria = null;
    notes = null;

    prePopulate(cur,fn){
        return super._prePopulate.call(this,cur,fn);
    }
    isValid(){
        let optional = ['selCriteria', 'notes'];
        return super._isValid.call(this, optional);
    }
    stringify(){
        return super._stringify.call(this, this.getConverters());
    }
    getConverters(){
        function numConvert(val){
            return parseInt(val);
        }
        return {
            recipient: numConvert,
            contractor: numConvert,
            provider: numConvert,
            formatId: numConvert,
            transmittalId: numConvert
        }
    }
}