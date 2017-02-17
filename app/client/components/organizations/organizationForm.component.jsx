import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import helpers from '../../helpers/html.helpers';
import {convertToLookup} from '../../helpers/flter.helpers';
import {OrganizationModel} from '../../models/organization';
import {startCommitOrganizationAction, startChangeOrganizationAction} from '../../redux/actions/organization.actions';

@connected
export default class OrganizationForm extends React.Component{
    constructor(props){
        super(props);
        this._refs = {};
        this.model = new OrganizationModel();
    }
    componentWillReceiveProps(nextProps){
        if (!nextProps.current.isNull()){
            this.populate(nextProps.current);
            this.isNew = false;
        }else{
            this.model = new OrganizationModel();
            this.isNew = true;
            this.populate();
        }
    }
    populate(props){
        this.model.prePopulate(this._refs, props || this.model);
        this.validate();
    }
    handleSubmit = e =>{
        e.preventDefault();
        let {dispatch} = this.props;
        let mode = this.submitBtn.innerText;
        if (mode === 'Submit')
            dispatch(startCommitOrganizationAction(this.model));
        else if (mode === 'Update'){
            dispatch(startChangeOrganizationAction(this.props.current.organizationId, this.model));
        }
    }
    validate(){
        this.submitBtn.disabled = !this.model.isValid();
    }
    updateModel = e =>{
        this.model[e.target.name] = e.target.value;
        this.validate();
    }
    render(){
        let orgTypes = convertToLookup(this.props.orgTypes, 'orgTypeId', 'type');
        let markup = (
            <form className='form-horizontal' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    {helpers.labelFor('Organization name')}
                    {helpers.textFieldFor('name', this.updateModel, ref=>this._refs['name'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Acronym *')}
                    {helpers.textFieldFor('abbrev', this.updateModel, ref=>this._refs['abbrev'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Organization type')}
                    {helpers.dropDownFor('orgTypeId', orgTypes, this.updateModel, ref=>this._refs['orgTypeId'] = ref)}
                </div>
                <button className='btn btn-primary pull-right' disabled='true' ref={ref=>this.submitBtn=ref}>{this.isNew ? 'Submit':'Update'}</button>
            </form>
        )
            
        return (
            <div>
                {helpers.panelFor('Organization detail', markup)}
                <span className='pull-right'>* = optional field</span>
            </div>
        )
    }
}