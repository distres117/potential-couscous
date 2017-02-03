import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import format from '../../helpers/format.helpers';
import helpers from '../../helpers/html.helpers';
import {summarizeData} from '../../helpers/flter.helpers';

@connected
export default class SummaryTable extends React.Component{
    
    render(){
        let {dataType, keyColumn, title, filter, summaryData, process, omit, formatter} = this.props;
        let tableData = summarizeData(summaryData[dataType], filter);
        if (process)
            tableData = process(tableData);
        let table;
        let loaded = tableData && tableData.length;
        if (loaded){
            table = (
                <BootstrapTable data={summarizeData(tableData, filter)} striped={true}>
                    {_.keys(tableData[0]).map((c,i)=>{
                        let isKey = c === keyColumn;
                        return <TableHeaderColumn key={i} isKey={isKey} hidden={isKey || (omit && omit.includes(c))} dataFormat={cell=>formatter(c,cell)} dataField={c}>{c}</TableHeaderColumn>  
                    })}
                </BootstrapTable> 
            )
        }
        return (
            <div className='col-lg-6'>
                {helpers.panelFor(title, table)}
            </div>
            
        )
    }
}