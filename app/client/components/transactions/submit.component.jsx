import React from 'react';
import { connected } from '../../helpers/redux.helpers';
import helper from '../../helpers/html.helpers';
import {TransactionSubmitModel} from '../../models/transaction.models';
import {startGetReadyToLoad} from '../../redux/actions/gpService.actions';

@connected
export default class TransactionSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.model = new TransactionSubmitModel();
        this.state = {dataType: 'featureClasses'};
    }
    componentDidMount(){
        this.props.dispatch(startGetReadyToLoad());
    }
    onDateChange = (dateString, {dateMoment, timestamp}) => {
        this.model.submitDate = new Date(dateString);
        console.log(this.model);
    }
    handleClick = (e)=>{
        e.preventDefault();
    }
    changeDataType = (e)=>{
        if (this.props.readyToLoad){
            this.setState({dataType:e.target.value})
        }
    }

    updateModel = (e)=>{
        this.model[e.target.name] = e.target.value;
        console.log(this.model);
    }
    render() {
        const markup = (
            <form className='form-horizontal'>
                <div className='form-group'>
                    {helper.labelFor('Submit date')}
                    {helper.datePickerFor('submitDate', this.onDateChange)}
                </div>
                <div className='form-group'>
                    {helper.labelFor('Submit person')}
                    {helper.dropDownFor('submitPerson', 'select person...', _.keys(this.props.people), this.updateModel)}
                </div>
                <div className='form-group'>
                    {helper.labelFor('Action')}
                    {helper.dropDownFor('action', 'Select transaction type...',this.model._actionList, this.updateModel)}
                </div>
                <div className='form-group'>
                    {helper.labelFor('Data type')}
                    {helper.dropDownFor('dataType',null, this.model._typeList, this.changeDataType )}
                </div>
                <div className='form-group'>
                    {helper.labelFor('Select data')}
                    <div hidden={!this.props.readyToLoad.loaded}>
                        {helper.dropDownFor('selectData','Select a dataset...',this.props.readyToLoad[this.state.dataType], this.updateModel)}
                    </div>
                    
                </div>
                <div className='form-group'>
                    {helper.labelFor('Geodatabase')}
                </div>
                <div className='form-group'>
                    {helper.labelFor('Dataset')}
                </div>
                <div className='form-group'>
                    {helper.labelFor('Description')}
                    {helper.textAreaFor('description', this.updateModel)}
                </div>
                <div className='form-group'>
                    {helper.labelFor('Indexes')}
                    {helper.buttonFor('indexBtn','Add index...', this.handleClick)}
                </div>
                {helper.buttonFor('submitTransaction', 'Submit', this.handleClick, 'btn btn-primary pull-right')}
            </form>
        )
        return (
            <div>
                {helper.panelFor('Submit Transaction', markup)}
            </div>
        );
    }
}
