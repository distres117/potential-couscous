import FormModel from './common';

export class InformationModel extends FormModel{
    dataCatalogId = null;
    title = null;
    abstract = null;
    purpose = null;
    source = null;
    maintainedBy = null;
    date = null;
    updateCycle = null;
    distribution = null;
    contact = null;
    documentation = null;
    notes = null;
    webService = null;
    template = null;
    internal = null;
    category1 = null;
    category2 = null;
    category3 = null;
    scale = null;
    layerStatus = null;

    prePopulate(cur,fn){
        return super._prePopulate.call(this,cur,fn);
    }
    isValid(){
        let required = ['title', 'abstract','purpose','dataCatalogId'];
        return super._isValid.call(this,null,required);
    }
    stringify(){
        return super._stringify.call(this, this.getConverters());
    }
    getConverters(){
        function numConvert(val){
            return parseInt(val);
        }
        return {
            dataCatalogId:numConvert,
            webService: numConvert,
            template: numConvert,
            internal: numConvert
        }
    }

}