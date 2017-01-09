import React from 'react';
import TransactionSubmit from './submit.component';
import TransactionReview from './review.component';
import TransactionLoad from './load.component';
import {connected} from '../../helpers/redux.helpers';
import {startGetAllPeopleAction, startGetTransactionData} from '../../redux/actions/db.actions.js';
import DataTable from '../common/datatable';
import {formStyles, tableStyles, infoStyles} from '../styles/layout.styles';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {setCurrentRecordAction} from '../../redux/actions/app.actions';
import InfoPanel from '../common/infoPane';

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
    handleRowSelect = (row, isSelected, e)=>{
        console.log(row.transactionId);
        this.props.dispatch(setCurrentRecordAction(row));
    }   
    render(){
        const selectRowProp = {
            mode:'radio',
            clickToSelect:true,
            bgColor:'pink',
            onSelect: this.handleRowSelect
        }
        return (
            <div>
                <div style={tableStyles}>
                    <BootstrapTable data={this.props.tableData} selectRow={selectRowProp} striped={true} hover={true} options={this.options} headerContainerClass='table-fixed'>
                        <TableHeaderColumn dataField='transactionId' isKey={true}>#</TableHeaderColumn>
                        <TableHeaderColumn dataField='submitName'>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='action'>Action</TableHeaderColumn>
                        <TableHeaderColumn dataField='dataType'>Type</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <div style={infoStyles}>
                    <InfoPanel/>
                </div>
                <div style={formStyles}>
                    <TransactionSubmit/>
                </div>
            </div>
        );
    }
}