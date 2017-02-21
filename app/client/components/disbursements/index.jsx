import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import {startGetDisbursements, startGetDisburmentTransmittalMethods,startGetDisbursementFormats} from '../../redux/actions/disbursement.actions';
import {startGetAllPeopleAction} from '../../redux/actions/people.actions';
import { formStyles, infoStyles, tableStyles, splitViews } from '../styles/layout.styles';
import DisbursementsForm from './disbursementsForm';
import DisbursementsTable from './disbursementsTable';
import {clearCurrentRecordAction} from '../../redux/actions/app.actions';
import {startGetCatalogRows} from '../../redux/actions/catalogRow.actions';
import { wellStyles } from '../styles/element.styles';
import helpers from '../../helpers/html.helpers';
import {filterAction} from '../../redux/actions/common.actions';
import {convertToLookup} from '../../helpers/flter.helpers';

@connected
export default class Disbursements extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(clearCurrentRecordAction());
        dispatch(startGetDisbursements());
        dispatch(startGetCatalogRows(false));
        dispatch(startGetAllPeopleAction(false));
        dispatch(startGetDisbursementFormats());
        dispatch(startGetDisburmentTransmittalMethods());
    }
    handleCreateNew = e =>{
        this.props.dispatch(clearCurrentRecordAction());
    }

    render(){
        return (
            <div>
                <div style={splitViews.left}>
                    <div style={tableStyles}>
                        <DisbursementsTable/>
                    </div>
                    <div className='well' style={wellStyles}>
                        <div className='clearfix'>
                            <button className='btn btn-success btn-sm' onClick={this.handleCreateNew}>Create new disbursement</button>
                        </div>
                    </div>
                </div>
                <div style={splitViews.right}>
                    <div style={formStyles}>
                        <DisbursementsForm/>
                    </div>
                </div>
            </div>
        )
    }
}