import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {setCurrentRecordAction, createTransactionAction, renderTransactionViewAction} from '../../redux/actions/app.actions.js';
import format from '../../helpers/format.helpers.js';

@connected
export default class TransactionTable extends React.Component{
    constructor(props){
        super(props)
    }
    handleRowSelect = (row, isSelected, e)=>{
        //console.log(row.transactionId);
        let {dispatch} = this.props;
        dispatch(setCurrentRecordAction(row));
        dispatch(renderTransactionViewAction(row));
        // if (!row.passed && !row.recorded)
        //     dispatch(reviewTransactionAction());
        // else if (row.passed && !row.recorded)
        //     dispatch(loadTransactionAction());
        // else if (row.passed && row.recorded)
        //     dispatch(nullTransactionAction());
        
    }
    handleFormat(cell){
        if (cell===1)
            return (<i className='glyphicon glyphicon-ok text-success'/>)
        return (<i className='glyphicon glyphicon-remove'/>)
    }
    truncateData(cell){
        if (cell && cell.length > 10)
            return cell.slice(0,10) + '...';
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
            <BootstrapTable data={this.props.tableData} selectRow={selectRowProp} striped={true} bordered={false} hover={true} options={this.options} headerContainerClass='table-fixed'>
                <TableHeaderColumn hidden={true} dataField='transactionId' isKey={true}>#</TableHeaderColumn>
                <TableHeaderColumn dataField='lastUpdated' dataFormat={cell=>format.dateFormat(cell)}>Updated</TableHeaderColumn>
                <TableHeaderColumn dataField='submitName'>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='action'>Action</TableHeaderColumn>
                <TableHeaderColumn dataField='passed' dataFormat={this.handleFormat}>Reviewed</TableHeaderColumn>
                <TableHeaderColumn dataField='recorded' dataFormat={this.handleFormat}>Loaded</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}