import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import {startGetAllPeopleAction, filterByOrgAction, startGetStates} from '../../redux/actions/people.actions';
import {startGetOrganizationsAction} from '../../redux/actions/organization.actions.js';
import {clearCurrentRecordAction} from '../../redux/actions/app.actions';
import PeopleTable from './peopleTable.component';
import PersonForm from './personForm.component';
import { formStyles, infoStyles, tableStyles, splitViews } from '../styles/layout.styles';
import { wellStyles } from '../styles/element.styles';
import helpers from '../../helpers/html.helpers.js';
import {convertToLookup} from '../../helpers/flter.helpers';

@connected
export default class People extends React.Component{
    constructor(props){
        super(props);
        this.baseData = null;
    }
    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(clearCurrentRecordAction());
        dispatch(startGetAllPeopleAction());
        dispatch(startGetOrganizationsAction(false));
        dispatch(startGetStates());
    }
    componentWillReceiveProps(nextProps){
        if (!this.baseData && nextProps.tableData.length){
            this.baseData = nextProps.tableData;
        }
    }
    handleCreateNew = (e)=>{
        this.props.dispatch(clearCurrentRecordAction());
    }
    filterByOrg = e=>{
        let {dispatch} = this.props;
        let value = parseInt(e.target.value);
        dispatch(filterByOrgAction(value, this.baseData));
    }
    render(){
        let organizations = convertToLookup(this.props.organizations, 'organizationId','abbrev');
        if (organizations)
            organizations = _.sortBy(organizations.filter(f=>f.label),['label']);
        return (
            <div>
                <div style={splitViews.left}>
                    <div style={tableStyles}>
                        <PeopleTable/>
                    </div>
                    <div className='well' style={wellStyles}>
                        <div className='clearfix'>
                            <button className='btn btn-success btn-sm' onClick={this.handleCreateNew}>Add new person</button>
                            <div className='pull-right'>
                                {helpers.labelFor('Show only')}
                                {helpers.dropDownFor(null, organizations, this.filterByOrg)}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={splitViews.right}>
                    <div style={formStyles}>
                        <PersonForm/>
                    </div>
                </div>
            </div>
        )
    }
}