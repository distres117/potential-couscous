import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import {contentPanelStyles} from '../styles/layout.styles';
import ReduxToastr from 'react-redux-toastr';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates={true}
                    position="top-left"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar/>
                <Navbar currentPath = {this.props.location.pathname}/>
                <div className='container' style={contentPanelStyles}>
                    {this.props.children}
                </div>
            </div>
            
        );
    };

}