import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import {tableStyles} from '../styles/layout.styles';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

@connected
export default class DataTable extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let headers;
        if (this.props.headers){
            headers = this.props.headers.map(h=>{
                return (
                    <TableHeaderColumn dataField={h.key} isKey={h.isKey}>{h.label}</TableHeaderColumn> 
                );
            })
        }
        return (
            <div style={tableStyles}>
                <BootstrapTable data={this.props.tableData} striped={true} hover={true}>
                    {headers}
                </BootstrapTable>
            </div>
        )
    }
}