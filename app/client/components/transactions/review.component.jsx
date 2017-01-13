import React from 'react';
import { connected } from '../../helpers/redux.helpers';
import helper from '../../helpers/html.helpers';
import {TransactionReviewModel} from '../../models/transaction.models';

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
        //this ensures that the appropriate values are changed on the initial mounting
        this.resetValues();
    }
    onDateChange = (dateString)=>{
        this.props.transaction.model.reviewDate = new Date(dateString);
    }
    updateModel = (e)=>{
        this.props.transaction.model[e.target.name] = e.target.value;
    }
    resetValues(){
        this.props.transaction.model.prePopulate(this._refs, (tar,val)=>tar.value=val);
    }
    render(){
        //this ensures that values are changed for each subsequent rendering (after initial mount)
        this.resetValues();
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
                            {helper.dropDownFor('reviewPerson',_.keys(this.props.people), this.updateModel, ref=>this._refs['reviewPerson']=ref)}
                        </div>
                        <div className='form-group'>
                            {helper.labelFor('Review notes')}
                            {helper.textAreaFor('reviewNotes', this.updateModel, ref=>this._refs['reviewNotes']=ref)}
                        </div>
                        <div className='form-group'>
                            {helper.labelFor('Passed')}
                            {helper.dropDownFor('passed', this.passedList, this.updateModel, ref=>this._refs['passed'] = ref)}
                        </div>
                        {helper.buttonFor('submitTransaction', 'Submit', this.handleClick, 'btn btn-primary pull-right')}
                    </form>
                </div>
                
            </div>
        ) 
    }
}