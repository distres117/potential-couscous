import client from '../../services/axios.service';
import types from './action.types';
import {setTableData} from './common.actions';
import {clearCurrentRecordAction} from './app.actions';
import {toastr} from 'react-redux-toastr';
import format from '../../helpers/format.helpers';
import {convertToLookup} from '../../helpers/flter.helpers';

const catalogRowSchema = 'dataCatalogId, type, name, status';

export const startGetCatalogRows = (toTable=true, query)=>{
    return (dispatch,getState)=>{
        return client.post('/api',{
            query:`{
                catalogRows(order:"name"){
                    ${catalogRowSchema}
                }
            }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            if (!toTable){
                dispatch({
                    type: types.GET_CATALOG_ROWS,
                    payload: convertToLookup(res.data.data.catalogRows, 'dataCatalogId', 'name')
                });
            }else{
                let catalogRows = format.flatten(res.data.data.catalogRows);
                dispatch(setTableData(catalogRows));
            }
        });
    }
}