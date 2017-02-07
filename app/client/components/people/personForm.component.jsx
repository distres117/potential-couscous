import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import helpers from '../../helpers/html.helpers';
import {convertToLookup} from '../../helpers/flter.helpers';

@connected
export default class PersonForm extends React.Component{
    constructor(props){
        super(props);
        this._refs = {};
    }
    updateModel = e =>{
    }
    render(){
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
                    {helpers.dropDownFor('organizationId',[],null,ref=>this._refs['organizationId'] = ref,true, 'col-lg-3' )}
                    {helpers.textFieldFor('position', this.updateModel, ref=>this._refs['position'] = ref, 'col-lg-3', 'Position')}
                    {helpers.textFieldFor('division', this.updateModel, ref=>this._refs['division'] = ref, 'col-lg-3', 'Division')}
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
                    {helpers.textFieldFor('city', this.updateModel, ref=>this._refs['city'], 'col-lg-3', 'City')}
                    {helpers.dropDownFor('state', [], this.updateModel, ref=>this._refs['state'],true, 'col-lg-3', 'State')}
                    {helpers.textFieldFor('zip', this.updateModel, ref=>this._refs['zip'], 'col-lg-3', 'Zip')}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Phone')}
                    {helpers.textFieldFor('phone', this.updateModel, ref=>this._refs['phone'], 'col-lg-5')}
                    {helpers.textFieldFor('extension', this.updateModel, ref=>this._refs['extension'], 'col-lg-3', 'Ext.')}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Notes')}
                    {helpers.textAreaFor('notes', this.updateModel, ref=>this._refs['notes'])}
                </div>
                <button className='btn btn-primary pull-right' disabled='true' ref={ref=>this.submitBtn=ref}>Submit</button>
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