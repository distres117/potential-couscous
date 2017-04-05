import React from 'react';
import helpers from '../../helpers/html.helpers';
import {convertToLookup} from '../../helpers/flter.helpers.js';
import {connected} from '../../helpers/redux.helpers';
import {InformationModel} from '../../models/information.model.js';
import {getCatalogRows, startChangeInformation} from '../../redux/actions/information.actions';

@connected
export default class InformationForm extends React.Component{
    constructor(props){
        super(props);
        this._refs = {};
        this.model = new InformationModel();
        this.scaleOpts = ['Local', 'Regional', 'National', 'Global'];
        this.layerStatusOpts = [];
        this.state ={primary:null,secondary:null,tertiary:null};

    }
    componentWillReceiveProps(nextProps){
        if (!nextProps.current.isNull()){
            this.populate(nextProps.current);
        }else{
            this.model = new InformationModel();
            this.populate();
        }
    }
    populate(props){
        if (props){
            this.setState({primary:props.category1, secondary: props.category2, tertiary: props.category3}, ()=>{
                this.model.prePopulate(this._refs, props);
                this.validate();
            });
        }else{
            this.model.prePopulate(this._refs, this.model);
            this.validate();
        }
        
    }
    validate(){
        this.submitBtn.disabled = !this.model.isValid();
    }
    updateModel = e =>{
        this.model[e.target.name] = e.target.value;
        this.validate();
    }
    changeCategory = e =>{
        this.updateModel(e);
        switch(e.target.name){
            case 'category1':
                this.setState({primary:e.target.value});
                break;
            case 'category2':
                this.setState({secondary: e.target.value});
                break;
            default:
                return;
        }
    }
    handleSubmit = e =>{
        e.preventDefault();
        let {dispatch} = this.props;
        dispatch(startChangeInformation(this.model));
    }
    render(){
        let {domainCategories} = this.props;
        let {primary,secondary} = this.state;
        const markup = (
            <form className='form-horizontal' onSubmit={this.handleSubmit}>
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
                    {helpers.dropDownFor('category1', Object.keys(domainCategories), this.changeCategory, ref=>this._refs['category1'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Secondary category')}
                    {helpers.dropDownFor('category2', primary ? Object.keys(domainCategories[primary]):[], this.changeCategory, ref=>this._refs['category2'] = ref)}
                </div>
                <div className='form-group'>
                    {helpers.labelFor('Tertiary category')}
                    {helpers.dropDownFor('category3', primary && secondary ? domainCategories[primary][secondary] : [], this.updateModel, ref=>this._refs['category3'] = ref)}
                </div>
                <button className = 'btn btn-primary pull-right' type='submit' ref={ref=>this.submitBtn = ref}>Update</button>
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