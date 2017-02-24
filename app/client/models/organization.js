import FormModel from './common';

export class OrganizationModel extends FormModel{
    name = null;
    abbrev = null;
    orgTypeId = null;

    prePopulate(cur,fn){
        return super._prePopulate.call(this,cur,fn);
    }
    isValid(){
        const optional = ['abbrev'];
        return super._isValid.call(this, optional);
    }
    stringify(){
        return super._stringify.call(this, this.getConverters());
    }
    getConverters(){
        return {
            orgTypeId:val=>parseInt(val)
        }
    }
}