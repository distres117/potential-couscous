import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import {startGetAllPeopleAction, filterByOrgAction} from '../../redux/actions/people.actions';
import PeopleTable from './peopleTable.component';
import PersonForm from './personForm.component';
import { formStyles, infoStyles, tableStyles, splitViews } from '../styles/layout.styles';
import { wellStyles } from '../styles/element.styles';
import helpers from '../../helpers/html.helpers.js';

@connected
export default class People extends React.Component{
    constructor(props){
        super(props);
        this.state = {orgs:[]}
    }
    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(startGetAllPeopleAction());
    }
    componentWillReceiveProps(nextProps){
        if (!this.state.orgs.length && nextProps.tableData.length){
            this.setState({orgs:_.uniq(nextProps.tableData.map(d=>d.abbrev).filter(f=>f)).sort()});
            this.baseData = nextProps.tableData;
        }
    }
    handleCreateNew = (e)=>{

    }
    filterByOrg = e=>{
        let {dispatch} = this.props;
        let value = e.target.value;
        dispatch(filterByOrgAction(value, this.baseData));
    }
    render(){
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
                                {helpers.dropDownFor(null, this.state.orgs, this.filterByOrg)}
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