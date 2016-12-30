import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {startGetReadyToLoad} from '../redux/actions/gpService.actions';
export class TestComponent extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        this.props.dispatch(startGetReadyToLoad());
        
    }
    render(){
        let {readyToLoad} = this.props;

        let itemsElem = readyToLoad.featureClasses ? this.props.readyToLoad.featureClasses.map((item,i)=><li key={i}>{item}</li>) : null;
        return (
            <div>
                <h1>It works!</h1>
                <ul>{itemsElem}</ul>
            </div>
        );
    }
}

export default connect(s=>s)(TestComponent);
