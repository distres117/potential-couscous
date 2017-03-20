import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import { formStyles, infoStyles, tableStyles, splitViews } from '../styles/layout.styles';
import InformationTable from './informationTable';
import InformationForm from './informationForm';
import {clearCurrentRecordAction, setDataQuery, clearDataQuery} from '../../redux/actions/app.actions';
import {getCatalogRows} from '../../redux/actions/information.actions';
import { wellStyles } from '../styles/element.styles';
import helpers from '../../helpers/html.helpers';
import {filterAction} from '../../redux/actions/common.actions';
import {convertToLookup} from '../../helpers/flter.helpers';

@connected
export default class Information extends React.Component{
    constructor(props){
        super(props);
        this.statusTypes = ['Production', 'Archived', 'Retired'];
    }
    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(clearCurrentRecordAction());
        dispatch(getCatalogRows());
    }
    filterByStatus = e=>{
        let {dispatch} = this.props;
        let val = e.target.value;
        if (val)
            dispatch(setDataQuery(`status:"${e.target.value}"`));
        else
            dispatch(clearDataQuery());
        dispatch(getCatalogRows());
    }
    render(){
        return (
            <div>
                <div style={splitViews.left}>
                    <div style={tableStyles}>
                        <InformationTable/>
                    </div>
                    <div className='well' style={wellStyles}>
                        <div className='clearfix'>
                            <div className='pull-right'>
                                {helpers.labelFor('Filter by status')}
                                {helpers.dropDownFor(null, this.statusTypes, this.filterByStatus)}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={splitViews.right}>
                    <div style={formStyles}>
                        <InformationForm/>
                    </div>
                </div>
            </div>
        )
    }
}