import React from 'react';
import TransactionSubmit from './submit.component';
import TransactionReview from './review.component';
import TransactionLoad from './load.component';
import { connected } from '../../helpers/redux.helpers';
import { startGetAllPeopleAction, startGetTransactionData } from '../../redux/actions/db.actions';
import { createTransactionAction, clearCurrentRecordAction } from '../../redux/actions/app.actions'
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
        dispatch(startGetAllPeopleAction());
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
        switch (mode) {
            case 'create':
                return <TransactionSubmit />
            case 'review':
                return <TransactionReview />;
            case 'load':
                return <TransactionLoad />;
            case 'none':
                return (
                    <div>
                        <h4>This transaction is closed</h4>
                    </div>
                )
            default:
                return (
                    <div>
                        <h4>No transactions are selected</h4>
                    </div>)
        }

    }


    render() {
        let create = !!this.props.transaction.create;
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
                    <div style={infoStyles} hidden={this.props.current.isNull()}>
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