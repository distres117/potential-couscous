import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import {startGetOrganizationsAction, startGetOrgTypes} from '../../redux/actions/organization.actions';
import OrganizationsTable from './organizationTable.component';
import OrganizationsForm from './organizationForm.component';
import { formStyles, infoStyles, tableStyles, splitViews } from '../styles/layout.styles';
import {clearCurrentRecordAction} from '../../redux/actions/app.actions';
import { wellStyles } from '../styles/element.styles';
import helpers from '../../helpers/html.helpers';
import {filterAction} from '../../redux/actions/common.actions';
import {convertToLookup} from '../../helpers/flter.helpers';

@connected
export default class Organizations extends React.Component{
    constructor(props){
        super(props);
        this.baseData = null;
    }
    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(clearCurrentRecordAction());
        dispatch(startGetOrgTypes());
        dispatch(startGetOrganizationsAction());
    }
    componentWillReceiveProps(nextProps){
        if (!this.baseData && nextProps.tableData.length){
            this.baseData = nextProps.tableData;
        }
    }
    handleCreateNew = e=>{
        this.props.dispatch(clearCurrentRecordAction());
    }
    filterByOrgType = e=>{
        let {dispatch} = this.props;
        let val = parseInt(e.target.value);
        dispatch(filterAction('orgTypeId', val, this.baseData));
    }
    render(){
        let orgTypes = convertToLookup(this.props.orgTypes, 'orgTypeId', 'type');
        return (
            <div>
                <div style={splitViews.left}>
                    <div style={tableStyles}>
                        <OrganizationsTable/>
                    </div>
                    <div className='well' style={wellStyles}>
                        <div className='clearfix'>
                            <button className='btn btn-success btn-sm' onClick={this.handleCreateNew}>Create new organization</button>
                            <div className='pull-right'>
                                {helpers.labelFor('Show only')}
                                {helpers.dropDownFor(null, orgTypes, this.filterByOrgType)}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={splitViews.right}>
                    <div style={formStyles}>
                        <OrganizationsForm/>
                    </div>
                </div>
            </div>
        )
    }
}