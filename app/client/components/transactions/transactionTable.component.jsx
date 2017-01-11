import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {setCurrentRecordAction, createTransactionAction} from '../../redux/actions/app.actions.js';

@connected
export default class TransactionTable extends React.Component{
    constructor(props){
        super(props)
    }
    handleRowSelect = (row, isSelected, e)=>{
        //console.log(row.transactionId);
        this.props.dispatch(createTransactionAction(false));
        this.props.dispatch(setCurrentRecordAction(row));
    }
    handleFormat(cell){
        if (cell)
            return (<i className='glyphicon glyphicon-ok text-success'/>)
        return (<i className='glyphicon glyphicon-remove'/>)
    }
    truncateData(cell){
        if (cell && cell.length > 15)
            return cell.slice(0,15) + '...';
        return cell;
    }
    render(){
        const selectRowProp = {
            mode:'radio',
            clickToSelect:true,
            bgColor:'pink',
            onSelect: this.handleRowSelect
        }
        return (
            <BootstrapTable data={this.props.tableData} selectRow={selectRowProp} striped={true} hover={true} options={this.options} headerContainerClass='table-fixed'>
                <TableHeaderColumn width='5' dataField='transactionId' isKey={true}>#</TableHeaderColumn>
                <TableHeaderColumn width='10' dataField='submitName' dataFormat={this.truncateData}>Name</TableHeaderColumn>
                <TableHeaderColumn width='10' dataField='action'>Action</TableHeaderColumn>
                <TableHeaderColumn dataField='submitDate' dataFormat={this.handleFormat}>Submitted</TableHeaderColumn>
                <TableHeaderColumn dataField='reviewDate' dataFormat={this.handleFormat}>Reviewed</TableHeaderColumn>
                <TableHeaderColumn dataField='loadDate' dataFormat={this.handleFormat}>Loaded</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}