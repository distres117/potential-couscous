import React from 'react';
import {connected} from '../../helpers/redux.helpers';

@connected
export default class DataTable extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div></div>
        )
    }
}