import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import {startGetOrganizationsAction} from '../../redux/actions/organization.actions';
import OrganizationsTable from './organizationTable.component';
import { formStyles, infoStyles, tableStyles, splitViews } from '../styles/layout.styles';
import { wellStyles } from '../styles/element.styles';
import helpers from '../../helpers/html.helpers.js';

@connected
export default class Organizations extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(startGetOrganizationsAction());
    }
    render(){
        return (
            <div>
                <div style={splitViews.left}>
                    <div style={tableStyles}>
                        <OrganizationsTable/>
                    </div>
                    <div className='well' style={wellStyles}>
                        <div className='clearfix'>
                            <button className='btn btn-success btn-sm'>Create new organization</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}