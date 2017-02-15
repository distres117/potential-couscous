import React from 'react';
import { connected } from '../../helpers/redux.helpers';
import helper from '../../helpers/html.helpers';
import {TransactionSubmitModel} from '../../models/transaction.models';
import {startGetReadyToLoad} from '../../redux/actions/gpService.actions';
import {startTransactionsDatasetSearch, startGetOneTransaction} from '../../redux/actions/transaction.actions';
import {startCommitTransaction} from '../../redux/actions/transaction.actions';

@connected
export default class TransactionSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.setInitialState();
        this.actionList = ['New', 'Update (version)', 'Update (external)', 'Archive', 'Rename', 'Delete'];
        this.typeList = [
            {label:'Feature Class', value:'featureClasses'},
            {label: 'Raster', value: 'rasters'},
            {label: 'Table', value: 'tables'}
        ];
        this._refs = {};
    }
    setInitialState(){
        this.state = {
            dataType:'featureClasses',
            searchMessage:null,
            searchData:null
        }
    }
    componentDidMount(){
        this.initialize(this.props);
    }
    componentWillReceiveProps(nextProps){
        let {searchResult, current} = nextProps;
        if (searchResult && searchResult.result){
            if (searchResult.extra)
                this.setState({searchMessage:searchResult.message, searchData:searchResult.extra.transactionId});
            this.handleSearchResult(nextProps.searchResult.result);
        }
        this.initialize(nextProps);

    }
    initialize(props){
        this.model = new TransactionSubmitModel();
        if(!props.current.isNull()){
            this.populate(props.current);
        }
        if(props.currentUser){
            this.model.submitPerson = props.currentUser;
            this.populate();
        }
    }
    validate(){
        this.submitBtn.disabled = !this.model.isValid(); //because of the way we're collecting values, must check validity manually after change/mount'
        //console.log(this.submitBtn.disabled);
    }
    onDateChange = (dateString, {dateMoment, timestamp}) => {
        this.model.submitDate = new Date(dateString);
    }
    handleClick = (e)=>{
        let {dispatch} = this.props;
        e.preventDefault();
        //console.log(transaction.model);
        dispatch(startCommitTransaction(this.model));
    }
    handleSearch = e=>{
        e.preventDefault();
        if (!this.search.value)
            return
        this.props.dispatch(startTransactionsDatasetSearch(this.search.value));
        this.search.value = '';
    }
    handleSearchResult = (result)=>{
        let elem = this.datasetList;
        if (Array.from(elem.options).some(o=>o.label===result))
            return;
        let newOption = document.createElement('option');
        newOption.value = newOption.text = result;
        let len = elem.options.length;
        elem.options[len] = newOption;
        elem.selectedIndex = len;
        this.model['submitName'] = result;
        this.validate();
        
    }
    handleSetCurrent = e =>{
        e.preventDefault();
        this.props.dispatch(startGetOneTransaction(this.state.searchData));
        this.setInitialState();

    }
    changeDataType = (e)=>{
        if (this.props.readyToLoad){
            this.setState({dataType:e.target.value});
            this.updateModel(e);
        }
    }

    updateModel = (e)=>{
        this.model[e.target.name] = e.target.value;
        this.validate();
    }
    populate(props){
        this.model.prePopulate(this._refs, props || this.model);
        this.validate();
    }
    render() {
        let {readyToLoad} = this.props;
        const markup = (
            <form className='form-horizontal' onSubmit={this.handleClick}>
                <div className='form-group'>
                    {helper.labelFor('Submit person')}
                    {helper.asyncDropdownFor('submitPerson', this.props.people, this.updateModel, ref=>this._refs['submitPerson'] = ref, ()=>!this.props.people.length)}
                </div>
                <div className='form-group'>
                    {helper.labelFor('Action')}
                    {helper.dropDownFor('action',this.actionList, this.updateModel)}
                </div>
                <div className='form-group'>
                    {helper.labelFor('Data type')}
                    {helper.dropDownFor('dataType', this.typeList, this.changeDataType )}
                </div>
                <div className='form-group'>
                    {helper.labelFor('Select data')}
                    <div>
                        {helper.asyncDropdownFor('submitName',this.props.readyToLoad[this.state.dataType], this.updateModel, ref=>this.datasetList = ref,()=>!this.props.readyToLoad.loaded)}
                    </div>
                    <div hidden={!this.props.readyToLoad.loaded}>
                        {helper.collapsibleFor('Data not in ready_to_load?', (
                        <div>
                            <br/>
                            <input type='text' placeholder='Enter the dataset name' ref={ref=>this.search = ref}/>
                            <button type='button' className='btn btn-xs btn-primary' onClick={this.handleSearch}>Search</button>
                            <div hidden={!this.state.searchMessage}>
                                <h5>{this.state.searchMessage}: <a href onClick={this.handleSetCurrent}>open latest...</a></h5>
                            </div> 
                        </div>

                        ))}
                    </div>
                </div>
                <div hidden={!this.props.versions.length}>
                    <div className='form-group'>
                        {helper.labelFor('Version')}
                        {helper.dropDownFor('submitVersion', this.props.versions, this.updateModel,null)}
                    </div>
                </div>
                
                <div className='form-group'>
                    {helper.labelFor('Description *')}
                    {helper.textAreaFor('description', this.updateModel)}
                </div>
                <div className='form-group'>
                    {helper.labelFor('Indexes *')}
                    {helper.textFieldFor('indexes', this.updateModel)}
                </div>
                <button className='btn btn-primary pull-right' disabled='true' ref={ref=>this.submitBtn=ref}>Submit</button>
            </form>
        )
        return (
            <div>
                {helper.panelFor('Submit Transaction', markup)}
                 <span className='pull-right'>* = optional field</span>
            </div>
        );
    }
}
