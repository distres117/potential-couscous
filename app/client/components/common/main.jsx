import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import {contentPanelStyles} from '../styles/layout.styles';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Navbar currentPath = {this.props.location.pathname}/>
                <div className='container' style={contentPanelStyles}>
                    {this.props.children}
                </div>
            </div>
            
        );
    };

}