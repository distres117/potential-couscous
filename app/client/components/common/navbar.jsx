import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component{
    constructor(props){
        super(props);
    }

    makeLinkFor(pathName, title){
        let currentPath = this.props.currentPath.replace(/\W*/,'');
        let clsName = currentPath === pathName ? 'active' : '';
        return (
            <li className={clsName}><Link to={pathName}>{title}</Link></li>
        );
    }
    render(){
        return (
            <nav className='navbar navbar-default navbar-fixed-top'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                    </div>
                    <Link className='navbar-brand' to='/'><i className='glyphicon glyphicon-globe'></i> Data Catalog</Link>
                    <div className='collapse navbar-collapse'>
                    <ul className='nav navbar-nav navbar-right'>
                        {this.makeLinkFor('transactions', 'Transactions')}
                        <li role="separator" className="divider"></li>
                        {this.makeLinkFor('information', 'Dataset Information')}
                        <li role="separator" className="divider"></li>
                        {this.makeLinkFor('disbursements', 'Disbursements')}
                        <li role="separator" className="divider"></li>
                        {this.makeLinkFor('people', 'People')}
                        <li role="separator" className="divider"></li>
                        {this.makeLinkFor('organizations', 'Organizations')}
                        <li role="separator" className="divider"></li>
                        {this.makeLinkFor('layers', 'Layer Management')}
                    </ul>
                </div>
                </div>
                
            </nav>
        )
    }
}