import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {setCurrentRecordAction, overwriteCurrentRecordAction} from '../../redux/actions/app.actions.js';
import format from '../../helpers/format.helpers.js';

@connected
export default class PeopleTable extends React.Component{
    constructor(props){
        super(props)
    }
    handleRowSelect = (row, isSelected, e)=>{
        let {dispatch} = this.props;
        dispatch(overwriteCurrentRecordAction(row));
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
                <TableHeaderColumn hidden={true} dataField='personId' isKey={true}>#</TableHeaderColumn>
                <TableHeaderColumn dataField='lastName'>Last name</TableHeaderColumn>
                <TableHeaderColumn dataField='firstName'>First name</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Organization</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}