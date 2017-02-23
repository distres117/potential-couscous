import React from 'react';
import helpers from '../../helpers/html.helpers';
import {convertToLookup} from '../../helpers/flter.helpers.js';
import {connected} from '../../helpers/redux.helpers';
import {DisbursementModel} from '../../models/disbursement.model';
import {startChangeDisbursement,startCommitDisbursement} from '../../redux/actions/disbursement.actions';

@connected
export default class DisbursementsForm extends React.Component{
    constructor(props){
        super(props);
        this._refs = {};
        this.model = new DisbursementModel();
    }
    componentWillReceiveProps(nextProps){
        if (!nextProps.current.isNull()){
            this.populate(nextProps.current);
            this.isNew = false;
        }else{
            this.model = new DisbursementModel();
            this.isNew = true;
            this.populate();
        }
    }
    populate(props){
        this.model.prePopulate(this._refs, props || this.model);
        this.validate();
    }
    validate(){
        this.submitBtn.disabled = !this.model.isValid();
    }
    updateModel = e =>{
        this.model[e.target.name] = e.target.value;
        this.validate();
    }
    handleSubmit = e =>{
        e.preventDefault();
        let {dispatch} = this.props;
        let mode = this.submitBtn.innerText;
        if(mode === 'Submit')
            dispatch(startCommitDisbursement(this.model));
        else if (mode === 'Update')
            dispatch(startChangeDisbursement(this.props.current.disbursementId, this.model));
    }
    render(){
        let markup = (
            <form className='form-horizontal' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    {helpers.labelFor('Dataset')}
                    {helpers.dropDownFor('dataCatalogId', this.props.catalogRows, this.updateModel, ref=>this._refs['dataCatalogId'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Recipient')}
                    {helpers.dropDownFor('recipient', this.props.people, this.updateModel, ref=>this._refs['recipient']=ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Data provider')}
                    {helpers.dropDownFor('provider', this.props.people, this.updateModel, ref=>this._refs['provider']=ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Format/Method')}
                    {helpers.dropDownFor('formatId',this.props.domainTypes,this.updateModel,ref=>this._refs['formatId']=ref,true,'col-lg-4')}
                    {helpers.dropDownFor('transmittalId',this.props.transmittalTypes,this.updateModel,ref=>this._refs['transmittalId']=ref,true,'col-lg-4')}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Selection criteria *')}
                    {helpers.textFieldFor('selCriteria',this.updateModel, ref=>this._refs['selCriteria']=ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Notes *')}
                    {helpers.textAreaFor('notes', this.updateModel, ref=>this._refs['notes']=ref)}
                </div>
                <button className='btn btn-primary pull-right' disabled='true' ref={ref=>this.submitBtn=ref}>{this.isNew ? 'Submit':'Update'}</button>
            </form>
        );
        return (
            <div>
                {helpers.panelFor('Disbursement detail', markup)}
                <span className='pull-right'>* = optional field</span>
            </div>
        )
    }
}