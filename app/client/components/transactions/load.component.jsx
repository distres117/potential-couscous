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
    componentWillReceiveProps(nextProps){
        this.initialize(nextProps);
    }
    componentDidMount(){
        this.initialize(this.props);
    }
    initialize(props){
        if(!props.current.isNull()){
            this.model = new TransactionLoadModel();
            //console.log(this.props.people, this.model.reviewPerson);
            this.populate(props.current);
        }
        if(props.currentUser){
            this.model.sdePerson = props.currentUser;
            this.populate();
        }
    }
    validate(){
        this.submitBtn.disabled = !this.model.isValid(); //because of the way we're collecting values, must check validity manually after change/mount'
    }
    handleClick = (e)=>{
        let {current,dispatch} = this.props;
        e.preventDefault();
        dispatch(startRecordTransaction(current.transactionId, this.model));
        //console.log(this.props.transaction.model, this.props.transaction.model.isValid());
    }

    populate(props){
        this.model.prePopulate(this._refs, props || this.model);
        this.validate();
    }
    onDateChange = (dateString)=>{
        this.model.loadDate = new Date(dateString);
        this.validate();
    }
    updateModel = (e)=>{
        this.model[e.target.name] = e.target.value;
        this.validate();
    }
    render(){
        let {processing} = this.props;
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
                    {helper.asyncButtonFor('loadBtn', 'Submit', processing, 'btn btn-primary pull-right', 'loader pull-right', ref=>this.submitBtn = ref )}
                </form>
        );
        return(
            <div>
                {helper.panelFor('Load Transaction', markup)}
            </div>
        );
    }
}