import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import helpers from '../../helpers/html.helpers';
import {convertToLookup} from '../../helpers/flter.helpers';
import {PersonModel} from '../../models/person.models';

@connected
export default class PersonForm extends React.Component{
    constructor(props){
        super(props);
        this._refs = {};
        this.model = new PersonModel();
        this.isNew = true;
    }
    componentWillReceiveProps(nextProps){
        if (!nextProps.current.isNull()){
            this.populate(nextProps.current);
            //this.model.prePopulate(this._refs, (tar,val)=>tar.value=val || '');
            this.isNew = false;
            //console.log(this.model, nextProps.current);
        }else{
            this.model = new PersonModel();
            this.isNew = true;
            this.populate();
        }
    }
    populate(props){
        this.model.prePopulate(this._refs, props || this.model);
        this.validate();
        console.log(this.model);
    }
    validate(){
        this.submitBtn.disabled = !this.model.isValid();
    }
    updateModel = e =>{
    }
    render(){
        let organizations = convertToLookup(this.props.organizations, 'organizationId', 'name')
        let states = convertToLookup(this.props.states,'stateId', 'abbreviation');
        let markup = (
            <form className='form-horizontal'>
                <div className='form-group'>
                    {helpers.textFieldFor('title', this.updateModel, ref=>this._refs['title'] = ref,'col-lg-3', 'Title')}
                    {helpers.textFieldFor('firstName', this.updateModel, ref=>this._refs['firstName'] = ref,'col-lg-3', 'First')}
                    {helpers.textFieldFor('middleName', this.updateModel, ref=>this._refs['middleName'] = ref,'col-lg-3', 'Middle')}
                    {helpers.textFieldFor('lastName', this.updateModel, ref=>this._refs['lastName'] = ref,'col-lg-3', 'Last')}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Email')}
                    {helpers.textFieldFor('eMail', this.updateModel, ref=>this._refs['eMail'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Organization')}
                    {helpers.dropDownFor('organizationId',organizations,this.updateModel,ref=>this._refs['organizationId'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.textFieldFor('position', this.updateModel, ref=>this._refs['position'] = ref, 'col-lg-4 col-lg-offset-3', 'Position')}
                    {helpers.textFieldFor('division', this.updateModel, ref=>this._refs['division'] = ref, 'col-lg-4', 'Division')}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Address')}
                    {helpers.textFieldFor('address1', this.updateModel, ref=>this._refs['address1'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.textFieldFor('address2', this.updateModel, ref=>this._refs['address2'] = ref, 'col-lg-8 col-lg-offset-3')}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('State')}
                    {helpers.textFieldFor('city', this.updateModel, ref=>this._refs['city'] = ref, 'col-lg-3', 'City')}
                    {helpers.dropDownFor('state', states, this.updateModel, ref=>this._refs['state']= ref,true, 'col-lg-3', 'State')}
                    {helpers.textFieldFor('zip', this.updateModel, ref=>this._refs['zip'] = ref, 'col-lg-3', 'Zip')}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Phone')}
                    {helpers.textFieldFor('phone', this.updateModel, ref=>this._refs['phone'] = ref, 'col-lg-5')}
                    {helpers.textFieldFor('extension', this.updateModel, ref=>this._refs['extension'] = ref, 'col-lg-3', 'Ext.')}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Notes')}
                    {helpers.textAreaFor('notes', this.updateModel, ref=>this._refs['notes'] = ref)}
                </div>
                <button className='btn btn-primary pull-right' disabled='true' ref={ref=>this.submitBtn=ref}>{this.isNew ? 'Submit':'Update'}</button>
            </form>
        );
        return (
            <div>
                {helpers.panelFor('Person detail', markup)}
                <span className='pull-right'>* = optional field</span>
            </div>
        )
    }
}