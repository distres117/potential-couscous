import React from 'react';
import { connected } from '../../helpers/redux.helpers';
import helper from '../../helpers/html.helpers';
import {TransactionReviewModel} from '../../models/transaction.models';
import {startUpdateTransaction} from '../../redux/actions/transaction.actions';

@connected
export default class TransactionReview extends React.Component{
    constructor(props){
        super(props);
        this.passedList = [
            {value: 0, label:'No'},
            {value: 1, label:'Yes'}
        ];
        this._refs = {};
        
    }
    componentDidMount(){
        this.initialize(this.props);
    }
    
    componentWillReceiveProps(nextProps){
        this.initialize(nextProps);
    }
    initialize(props){
        if(!props.current.isNull()){
            this.model = new TransactionReviewModel();
            //console.log(this.props.people, this.model.reviewPerson);
            this.populate(props.current);
        }
        if(props.currentUser){
            this.model.reviewPerson = props.currentUser;
            this.populate();
        }
    }
    validate(){
        this.submitBtn.disabled = !this.model.isValid(); //because of the way we're collecting values, must check validity manually after change/mount'
    }
    handleClick = (e)=>{
        e.preventDefault();
        let {dispatch, current} = this.props;
        dispatch(startUpdateTransaction(current.transactionId, this.model ));
        //console.log(this.props.transaction.model, this.props.transaction.model.isValid());
    }
    onDateChange = (dateString, opt)=>{
        this.model.reviewDate = opt.timestamp;
        this.validate();
    }
    updateModel = (e)=>{
        let model = this.model;
        model[e.target.name] = e.target.value;
        this.validate();
    }
    populate(props){
        this.model.prePopulate(this._refs, props || this.model);
        this.validate();
    }
    render(){
        return(
            <div>
                <div className='panel panel-default'>
                    <div className='panel-heading'>
                        <h3 className='panel-title'>Review Transaction</h3>
                    </div>
                    <div className='panel-body'>
                        <form className='form-horizontal'>
                            <div className='form-group'>
                                {helper.labelFor('Reviewer')}
                                {helper.dropDownFor('reviewPerson',this.props.people, this.updateModel, ref=>this._refs['reviewPerson']=ref)}
                            </div>
                            <div className='form-group'>
                                {helper.labelFor('Review notes *')}
                                {helper.textAreaFor('reviewNotes', this.updateModel, ref=>this._refs['reviewNotes']=ref)}
                            </div>
                            <div className='form-group'>
                                {helper.labelFor('Passed')}
                                {helper.dropDownFor('passed', this.passedList, this.updateModel, ref=>this._refs['passed'] = ref)}
                            </div>
                            <button className='btn btn-primary pull-right' name='submitTransaction' ref={ref=>this.submitBtn=ref} onClick={this.handleClick}>Submit</button> 
                        </form>
                    </div>
                    
                </div>
                <span className='pull-right'>* = optional field</span>
            </div>
        ) 
    }
}