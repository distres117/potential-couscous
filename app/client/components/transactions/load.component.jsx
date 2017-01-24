import React from 'react';
import { connected } from '../../helpers/redux.helpers';
import helper from '../../helpers/html.helpers';
import {TransactionLoadModel} from '../../models/transaction.models';
import {startRecordTransaction} from '../../redux/actions/transaction.actions';

@connected
export default class TransactionLoad extends React.Component{
    constructor(props){
        super(props);
        this._refs = {};
    }
    componentDidMount(){
        this.resetValues();
        this.checkIfValid();
    }
    checkIfValid(){
        if (!this.props.transaction.model)
            return;
        this.submitBtn.disabled = !this.props.transaction.model.isValid(); //because of the way we're collecting values, must check validity manually after change/mount'
    }
    handleClick = (e)=>{
        let {current,dispatch} = this.props;
        e.preventDefault();
        dispatch(startRecordTransaction(current.transactionId));
        //console.log(this.props.transaction.model, this.props.transaction.model.isValid());
    }

    resetValues(){
        if (!this.props.transaction.model)
            return;
        //console.log(this.props.transaction.model);
        this.props.transaction.model.prePopulate(this._refs, (tar,val)=>tar.value=val);
    }
    onDateChange = (dateString)=>{
        this.props.transaction.model.loadDate = new Date(dateString);
        this.checkIfValid();
    }
    updateModel = (e)=>{
        this.props.transaction.model[e.target.name] = e.target.value;
        this.checkIfValid();
    }
    render(){
        this.resetValues();
        const markup = (
            <form className='form-horizontal' onSubmit={this.handleClick}>
                    <div className='form-group'>
                        {helper.labelFor('Dataset name')}
                        {helper.textFieldFor('submitName', this.updateModel, ref=>this._refs['submitName'] = ref)}  
                    </div>
                    <div className='form-group'>
                        {helper.labelFor('Sde person')}
                        {helper.dropDownFor('sdePerson',this.props.people, this.updateModel, ref=>this._refs['sdePerson'] = ref )}
                    </div>
                    <button className='btn btn-primary pull-right' ref={ref=>this.submitBtn = ref}>Submit</button>
                </form>
        );
        return(
            <div>
                {helper.panelFor('Load Transaction', markup)}
            </div>
        );
    }
}