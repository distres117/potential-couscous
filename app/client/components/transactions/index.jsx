import React from 'react';
import TransactionSubmit from './submit.component';
import TransactionReview from './review.component';
import TransactionLoad from './load.component';
import {connected} from '../../helpers/redux.helpers';
import {startGetAllPeopleAction, startGetTransactionData} from '../../redux/actions/db.actions.js';
import DataTable from '../common/datatable';

@connected
export default class TransactionsComponent extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(startGetAllPeopleAction());
        dispatch(startGetTransactionData());
    }
    getTableControls(){
        return (
            <div className='clearfix'>
                <div className='checkbox pull-right' >
                    <label>
                        <input type='checkbox'/> Check me out
                    </label>
                </div>
            </div>
        )
    }
    render(){
        return (
            <div>
                <DataTable headers={['header1', 'header2', 'header3']} controls = {this.getTableControls()}/>
                <TransactionSubmit/>
            </div>
        );
    }
}