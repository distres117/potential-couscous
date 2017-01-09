import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import helper from '../../helpers/html.helpers';
@connected
export default class InfoPanel extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let markup = (
            <div>
                <h4>{this.props.current ? this.props.current.submitName : null}</h4>
            </div>
        );
        return(
            <div>
                {helper.panelFor('Transaction info', markup)}
            </div>
        );
    }
}