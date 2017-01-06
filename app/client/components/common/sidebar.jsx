import React from 'react';
import {sidebarStyles} from '../styles/layout.styles';
import {Link} from 'react-router';

export default class Sidebar extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div style={sidebarStyles}>
                <ul className='list-group'>
                    <li><Link to='transactions'>Transactions</Link></li>
                    <li role="separator" className="divider"></li>
                    <li><Link to='transactions'>Dataset Information</Link></li>
                    <li role="separator" className="divider"></li>
                    <li><Link to='transactions'>Disbursements</Link></li>
                    <li role="separator" className="divider"></li>
                    <li><Link to='transactions'>People</Link></li>
                    <li role="separator" className="divider"></li>
                    <li><Link to='transactions'>Organizations</Link></li>
                    <li role="separator" className="divider"></li>
                    <li><Link to='transactions'>Layer Management</Link></li>
                </ul>
            </div>
        )
    }
}