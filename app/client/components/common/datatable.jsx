import React from 'react';
import {connected} from '../../helpers/redux.helpers';

@connected
export default class DataTable extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const headers = this.props.headers.map((h,i)=><th key={i}>{h}</th>)
        const rows = this.props.tableData.map((r,ri)=>{
            return (
                <tr key={ri}>{r.map((c,ci)=>{
                        return <td key={ri + ci}>{c}</td> 
                    })}
                </tr>
            );
        })
        return (
            <div className='panel panel-default'>
                <div class='panel-body'>
                    <table className='table table-striped table-hover'>
                        <thead>
                            <tr>{headers}</tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
                <div className='panel-footer'>
                    {this.props.controls}
                </div>
                
            </div>
        );
    }
}