import React from 'react';
import {connected} from '../../helpers/redux.helpers';

@connected
export default class SummaryCallout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {title, query, summaryData} = this.props;
        let queryResult = query(summaryData); 
        return(
            <div style={{textAlign:'center'}} className='col-lg-3'>
                <h4>{title}</h4>
                <h1>{queryResult ? queryResult.length : 0}</h1>
            </div>
        )
        
    }
}