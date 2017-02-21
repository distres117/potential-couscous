import React from 'react';
import helpers from '../../helpers/html.helpers';
import {convertToLookup} from '../../helpers/flter.helpers.js';
import {connected} from '../../helpers/redux.helpers';

@connected
export default class DisbursementsForm extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let markup = (
            <form className='form-horizontal' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    {helpers.labelFor('Dataset')}
                    {helpers.dropDownFor('dataCatalogId', this.props.catalogRows)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Recipient')}
                    {helpers.dropDownFor('recipient', this.props.people)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Data provider')}
                    {helpers.dropDownFor('provider', this.props.people)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Format/Method')}
                    {helpers.dropDownFor('formatId',this.props.domainTypes,null,null,true,'col-lg-4')}
                    {helpers.dropDownFor('transmittalId',this.props.transmittalTypes,null,null,true,'col-lg-4')}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Selection criteria *')}
                    {helpers.textFieldFor('selCriteria')}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Notes *')}
                    {helpers.textAreaFor('notes')}
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