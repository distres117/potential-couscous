import React from 'react';
import TransactionSubmit from './submit.component';
import TransactionReview from './review.component';
import TransactionLoad from './load.component';
import {connected} from '../../helpers/redux.helpers';
import {startGetAllPeopleAction, startGetTransactionData} from '../../redux/actions/db.actions';
import {createTransactionAction} from '../../redux/actions/app.actions'
import TransactionTable from './transactionTable.component';
import {formStyles, infoStyles, tableStyles, splitViews} from '../styles/layout.styles';
import {wellStyles} from '../styles/element.styles.js';
import InfoPanel from '../common/infoPane';

@connected
export default class TransactionsComponent extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(startGetAllPeopleAction());
        dispatch(startGetTransactionData('recorded:0'));
    }
    handleShowAllToggle = e=>{
        if (e.target.checked)
            this.props.dispatch(startGetTransactionData());
        else
            this.props.dispatch(startGetTransactionData('recorded:0'));
    }
    handleCreateNew = ()=>{
        this.props.dispatch(createTransactionAction(true));   
    }
    getForm(){
        let current = this.props.current;
        if (!!this.props.transaction.create)
            return <TransactionSubmit/>
        else if (current.submitDate && !current.reviewDate && !current.loadDate)
            return <TransactionReview/>;
        else if (current.submitDate && current.reviewDate && !current.loadDate)
            return <TransactionLoad/>;
        else if (current.submitDate && current.reviewDate && current.loadDate)
            return (
                <div>
                    <h4>This transaction is closed</h4>
                </div>
            )
        return (
            <div>
                <h4>No transactions are selected</h4>
            </div>
        )
    }
       
    render(){
        let create = !!this.props.transaction.create;
        return (
            <div>
                <div style={splitViews.left}>
                    <div style={tableStyles}>
                        <TransactionTable/>
                    </div>
                    <div className='well' style={wellStyles}>
                        <div className='clearfix'>
                            <button className={'btn btn-success btn-sm' + (create ? ' active' : '') } onClick={this.handleCreateNew}>Create transaction</button>
                            <div className='pull-right'>
                                <input type='checkbox' onClick={this.handleShowAllToggle}/> Show open and closed transactions
                            </div>
                        </div>
                    </div>
                </div>
                <div style={splitViews.right}>
                    <div style={infoStyles}>
                        <InfoPanel/>
                    </div>
                    <div style={formStyles}>
                        {this.getForm()}
                    </div>                
                </div>
            </div>
        );
    }
}