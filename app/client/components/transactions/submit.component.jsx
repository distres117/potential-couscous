import React from 'react';
import { connected } from '../../helpers/redux.helpers';
import helper from '../../helpers/html.helpers';
import {TransactionSubmitModel} from '../../models/transaction.models';
import {startGetReadyToLoad} from '../../redux/actions/gpService.actions';
import {startCommitData} from '../../redux/actions/db.actions';

@connected
export default class TransactionSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dataType: 'featureClasses'};
        this.actionList = ['New', 'Update (version)', 'Update (external)', 'Archive', 'Rename', 'Delete'];
        this.typeList = [
            {label:'Feature Class', value:'featureClasses'},
            {label: 'Raster', value: 'rasters'},
            {label: 'Table', value: 'tables'}
        ];
    }
    componentDidMount(){
        this.props.dispatch(startGetReadyToLoad());
    }
    checkIfValid(){
        this.submitBtn.disabled = !this.props.transaction.model.isValid(); //because of the way we're collecting values, must check validity manually after change/mount'
        //console.log(this.submitBtn.disabled);
    }
    onDateChange = (dateString, {dateMoment, timestamp}) => {
        this.props.transaction.model.submitDate = new Date(dateString);
    }
    handleClick = (e)=>{
        let {dispatch} = this.props;
        e.preventDefault();
        dispatch(startCommitData(this.props.transaction.model));
        

    }
    changeDataType = (e)=>{
        if (this.props.readyToLoad){
            this.setState({dataType:e.target.value});
            this.updateModel(e);
        }
    }

    updateModel = (e)=>{
        this.props.transaction.model[e.target.name] = e.target.value;
        this.checkIfValid();
        //console.log(this.props.transaction.model);
    }
    render() {
        let {model} = this.props.transaction;
        const markup = (
            <form className='form-horizontal' onSubmit={this.handleClick}>
                <div className='form-group'>
                    {helper.labelFor('Submit date')}
                    {helper.datePickerFor('submitDate', this.onDateChange)}
                </div>
                <div className='form-group'>
                    {helper.labelFor('Submit person')}
                    {helper.dropDownFor('submitPerson', this.props.people, this.updateModel)}
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
                    <div hidden={!this.props.readyToLoad.loaded}>
                        {helper.dropDownFor('submitName',this.props.readyToLoad[this.state.dataType], this.updateModel)}
                    </div>
                    
                </div>
                <div className='form-group'>
                    {helper.labelFor('Description')}
                    {helper.textAreaFor('description', this.updateModel)}
                </div>
                <div className='form-group'>
                    {helper.labelFor('Indexes')}
                    {helper.buttonFor('indexBtn','Add index...', this.handleClick)}
                </div>
                <button className='btn btn-primary pull-right' disabled='true' ref={ref=>this.submitBtn=ref}>Submit</button>
            </form>
        )
        return (
            <div>
                {helper.panelFor('Submit Transaction', markup)}
            </div>
        );
    }
}
