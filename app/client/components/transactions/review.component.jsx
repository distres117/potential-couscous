import React from 'react';
import { connected } from '../../helpers/redux.helpers';
import helper from '../../helpers/html.helpers';
import {TransactionReviewModel} from '../../models/transaction.models';
import {startGetReadyToLoad} from '../../redux/actions/gpService.actions';
import {startGetAllPeopleAction} from '../../redux/actions/db.actions';

@connected
export default class TransactionReview extends React.Component{
    constructor(props){
        super(props);
        this.model = new TransactionReviewModel();
    }
    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(startGetAllPeopleAction());
    }

    onDateChange = (dateString)=>{
        this.model.reviewDate = new Date(dateString);
    }
    updateModel = (e)=>{
        this.model[e.target.name] = e.target.value;
    }
    render(){
        return(
            <div>
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
                
                </form>
            </div>
        ) 
    }
}