import React from 'react';
import axios from 'axios';
import {connected} from '../helpers/redux.helpers';
import {startGetReadyToLoad, noWork} from '../redux/actions/gpService.actions';

@connected
export default class TestComponent extends React.Component{
    constructor(props){
        super(props);
    }
    toggleClick = ()=>{
        this.props.dispatch(noWork());
    }
    componentDidMount(){
        this.props.dispatch(startGetReadyToLoad());
        
    }
    getClicked(){
        if (this.props.clicked)
            return (<h2>You clicked!</h2>);
        return;
    }
    render(){
        let {readyToLoad, clicked} = this.props;
        let itemsElem = readyToLoad.featureClasses ? this.props.readyToLoad.featureClasses.map((item,i)=><li key={i}>{item}</li>) : null;
        return (
            <div>
                <button onClick={this.toggleClick}></button>
                {this.getClicked()}
                <h1>It works!</h1>
                <ul>{itemsElem}</ul>
            </div>
        );
    }
}

