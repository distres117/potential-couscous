import React from 'react';
import SummaryTable from '../dashboard/summaryTable.component';
import SummaryCallout from '../dashboard/summaryCallout.component';
import {connected} from '../../helpers/redux.helpers';
import {startGetInitialAction} from '../../redux/actions/common.actions';
import helpers from '../../helpers/format.helpers';
import {filterData} from '../../helpers/flter.helpers';
import {convertToLookup} from '../../helpers/flter.helpers';

@connected
export default class Summary extends React.Component{
    constructor(props){
        super(props);
        this.transactionFilter = it=>{
            return it.recorded === 0;
        }
        this.closeTransactionFilter = it=>{
            return it.recorded === 1;
        }
        this.disbursementProcess = arr =>{
            return helpers.flatten(arr);
        }
        
    }
    formatDate = c=>{
        return helpers.dateFormat(c);
    }
    formatPerson = p=>{
        let people = convertToLookup(this.props.summaryData.people, 'personId', 'fullName');
        return helpers.personFormat.call(people, p)
    }
    formatter = (tag, cell)=>{
        let formats = {
            submitDate: this.formatDate,
            loadDate: this.formatDate,
            date: this.formatDate,
            provider: this.formatPerson,
            recipient: this.formatPerson

        };
        if (formats[tag])
            return formats[tag](cell);
        return cell;
    }
    calloutQuery(key,data, filterFn){
        let tableData = data[key];
        if (!tableData || !tableData.length)
            return;
        return filterData(data[key], filterFn);
    }

    componentDidMount(){
        this.props.dispatch(startGetInitialAction());
    }
    render(){
        let {summaryData} = this.props;
        if (_.keys(summaryData).length){
            return (
                <div>
                    <div className='col-lg-12 well'>
                        <SummaryCallout title='Open transactions' query={data=>this.calloutQuery('transactions', data, o=>o.recorded===0)}/>
                        <SummaryCallout title='Recorded transactions' query={data=>this.calloutQuery('transactions', data, o=>o.recorded===1)}/>
                        <SummaryCallout title='Disbursements' query={data=>this.calloutQuery('disbursements', data)}/>
                        <SummaryCallout title='Layers' query={data=>this.calloutQuery('layers', data)}/>
                    </div> 
                    <br/>
                    <div>
                        <SummaryTable dataType='transactions' keyColumn='transactionId' title='Recently created transactions' filter={this.transactionFilter} omit={['recorded']} formatter={this.formatter}></SummaryTable>
                        <SummaryTable dataType='transactions' keyColumn='transactionId' title='Recently closed transactions' filter={this.closeTransactionFilter} omit={['recorded']} formatter={this.formatter}></SummaryTable>
                        <SummaryTable dataType='disbursements' keyColumn='disbursementId' title='Recently disbursed' process={this.disbursementProcess} formatter={this.formatter} ></SummaryTable>
                    </div> 
                </div>
            )
        }
        return (
            <div>
                <div className='loader' style={{position:'absolute', top:'50%', left:'50%'}}></div>
            </div>
        )
        
    }
}