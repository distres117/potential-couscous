import React from 'react';
import { connected } from '../../helpers/redux.helpers';
import helper from '../../helpers/html.helpers';
import {TransactionReviewModel} from '../../models/transaction.models';

@connected
export default class TransactionReview extends React.Component{
    constructor(props){
        super(props);
        this.model = new TransactionReviewModel();
    }

    onDateChange = (dateString)=>{
        this.model.reviewDate = new Date(dateString);
    }
    updateModel = (e)=>{
        this.model[e.target.name] = e.target.value;
    }
    render(){
        return(
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Review Transaction</h3>
                </div>
                <div className='panel-body'>
                    <form className='form-horizontal'>
                        <div className='form-group'>
                            {helper.labelFor('Review date')}
                            {helper.datePickerFor('reviewDate', this.onDateChange)}
                        </div>
                        <div className='form-group'>
                            {helper.labelFor('Reviewer')}
                            {helper.dropDownFor('reviewer', '', _.keys(this.props.people), this.updateModel)}
                        </div>
                        <div className='form-group'>
                            {helper.labelFor('Review notes')}
                            {helper.textAreaFor('reviewNotes', this.updateModel)}
                        </div>
                        <div className='form-group'>
                            {helper.labelFor('Passed')}
                            {helper.dropDownFor('passed', '', this.model._passedList )}
                        </div>
                        {helper.buttonFor('submitTransaction', 'Submit', this.handleClick, 'btn btn-primary pull-right')}
                    </form>
                </div>
                
            </div>
        ) 
    }
}