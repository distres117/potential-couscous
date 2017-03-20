import React from 'react';
import helpers from '../../helpers/html.helpers';
import {convertToLookup} from '../../helpers/flter.helpers.js';
import {connected} from '../../helpers/redux.helpers';
import {InformationModel} from '../../models/information.model.js';
import {startChangeDisbursement,startCommitDisbursement} from '../../redux/actions/disbursement.actions';

@connected
export default class InformationForm extends React.Component{
    constructor(props){
        super(props);
        this._refs = {};
        this.model = new InformationModel();
        this.scaleOpts = ['Local', 'Regional', 'National', 'Global'];
        this.layerStatusOpts = [];

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
    render(){
        const markup = (
            <form className='form-horizontal'>
                <div className='form-group'>
                    {helpers.labelFor('Source')}
                    {helpers.textFieldFor('source', this.updateModel, ref=>this._refs['source'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Maintained By')}
                    {helpers.textFieldFor('maintainedBy', this.updateModel, ref=>this._refs['maintainedBy'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Scale/Layer status')}
                    {helpers.dropDownFor('scale', this.scaleOpts, this.updateModel, ref=>this._refs['scale'] = ref,null, 'col-md-4')}
                    {helpers.dropDownFor('layerStatus', this.layerStatusOpts, this.updateModel, ref=>this._refs['layerStatus'] = ref, null,'col-md-4' )}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Date/Update cycle')}
                    {helpers.datePickerFor('date', this.updateModel, 'col-md-4')}
                    {helpers.dropDownFor('updateCycle', [], this.updateModel, ref=>this._refs['updateCycle'] = ref,null,'col-md-4')}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Contact/Distribution')}
                    {helpers.textFieldFor('contact', this.updateModel, ref=>this._refs['contact'] = ref, 'col-md-4')}
                    {helpers.textFieldFor('distribution', this.updateModel, ref=>this._refs['distribution'] = ref,'col-md-4')}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Documentation')}
                    {helpers.textAreaFor('documentation', this.updateModel,ref=>this._refs['documentation'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Notes')}
                    {helpers.textAreaFor('notes',this.updateModel,ref=>this._refs['notes'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Primary category')}
                    {helpers.dropDownFor('category1', [], this.updateModel, ref=>this._refs['category1'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Secondary category')}
                    {helpers.dropDownFor('category2', [], this.updateModel, ref=>this._refs['category2'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Tertiary category')}
                    {helpers.dropDownFor('category3', [], this.updateModel, ref=>this._refs['category3'] = ref)}
                </div>
                <button className = 'btn btn-primary pull-right' type='submit'>Submit</button>
            </form>
        );
        return (
            <div>
                {helpers.panelFor('Dataset Information', markup)}
                <span className='pull-right'>* = optional field</span>
            </div>
        )
    }
}