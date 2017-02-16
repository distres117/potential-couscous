import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import helpers from '../../helpers/html.helpers';
import {convertToLookup} from '../../helpers/flter.helpers';
import {OrganizationModel} from '../../models/organization';

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
        
    }
    validate(){
        this.submitBtn.disabled = !this.model.isValid();
    }
    updateModel = e =>{
        this.model[e.target.name] = e.target.value;
        this.validate();
    }
    render(){
        let markup = (
            <form className='form-horizontal' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    
                </div>
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