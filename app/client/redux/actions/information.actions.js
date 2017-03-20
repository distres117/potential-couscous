import client from '../../services/axios.service';
import {toastr} from 'react-redux-toastr';
import {setPeopleAction, setAppUserAction, overwriteCurrentRecordAction} from './app.actions';
import {setTableData, commitTableData} from './common.actions';
import {clearCurrentRecordAction} from './app.actions';
import {convertToLookup} from '../../helpers/flter.helpers';
import format from '../../helpers/format.helpers';
import types from './action.types';

export const getCatalogRows = ()=>{
    return (dispatch,getState)=>{
        const query = getState().dataQuery;
        return client.post('/api',{
            query:`{
                catalogRows(limit:100, ${query}){
                    dataCatalogId,name,type,status,updated
                }
            }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            let catalogRows = res.data.data.catalogRows;
            dispatch(setTableData(catalogRows));
        });
    };
};