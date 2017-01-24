import React from 'react';
import TransactionSubmit from './submit.component';
import TransactionReview from './review.component';
import TransactionLoad from './load.component';
import { connected } from '../../helpers/redux.helpers';
import { startGetTransactionData } from '../../redux/actions/transaction.actions';
import {startGetOrgPeopleAction} from '../../redux/actions/people.actions.js';
import { createTransactionAction, clearCurrentRecordAction } from '../../redux/actions/app.actions';
import {startGetReadyToLoad} from '../../redux/actions/gpService.actions';
import TransactionTable from './transactionTable.component';
import { formStyles, infoStyles, tableStyles, splitViews } from '../styles/layout.styles';
import { wellStyles } from '../styles/element.styles.js';
import TransactionInfo from './transactionInfo.component';

@connected
export default class TransactionsComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let {dispatch} = this.props;
        dispatch(startGetOrgPeopleAction('NYCEM'));
        dispatch(startGetReadyToLoad());
        dispatch(startGetTransactionData(0, 'recorded:0'));
    }
    handleShowAllToggle = e => {
        if (e.target.checked)
            this.props.dispatch(startGetTransactionData());
        else
            this.props.dispatch(startGetTransactionData(0, 'recorded:0'));
    }
    handleCreateNew = () => {
        let {dispatch} = this.props;
        dispatch(clearCurrentRecordAction());
        dispatch(createTransactionAction());
    }
    getForm() {
        let current = this.props.current;
        let {mode} = this.props.transaction;
        if (mode === 'create')
            return <TransactionSubmit />
        else if(!current.isNull() && mode=== 'review')
            return <TransactionReview />;
        else if(!current.isNull() && mode==='load')
            return <TransactionLoad />;
        else if (!current.isNull() && mode==='none'){
            return (
                <div>
                    <h4>This transaction is closed</h4>
                </div>
            )
        }
        else if (current.isNull()){
            return (
                <div>
                    <h4>No transactions are selected</h4>
                </div>)
        }

    }


    render() {
        let create = this.props.transaction.mode === 'create';
        return (
            <div>
                <div style={splitViews.left}>
                    <div style={tableStyles}>
                        <TransactionTable />
                    </div>
                    <div className='well' style={wellStyles}>
                        <div className='clearfix'>
                            <button className={'btn btn-success btn-sm' + (create ? ' active' : '')} onClick={this.handleCreateNew}>Create transaction</button>
                            <div className='pull-right'>
                                <input type='checkbox' onClick={this.handleShowAllToggle} /> Show open and closed transactions
                            </div>
                        </div>
                    </div>
                </div>
                <div style={splitViews.right}>
                    <div style={infoStyles} hidden={this.props.current.isNull()} >
                        <TransactionInfo />
                    </div>
                    <div style={formStyles}>
                        {this.getForm()}
                    </div>
                </div>
            </div>
        );
    }
}