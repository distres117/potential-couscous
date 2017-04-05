import client from '../../services/axios.service';
import {toastr} from 'react-redux-toastr';
import {setPeopleAction, setAppUserAction, overwriteCurrentRecordAction} from './app.actions';
import {setTableData, commitTableData} from './common.actions';
import {clearCurrentRecordAction} from './app.actions';
import {convertToLookup} from '../../helpers/flter.helpers';
import format from '../../helpers/format.helpers';
import types from './action.types';

const infoSchema = `dataCatalogId,
                        title,
                        abstract,
                        purpose,
                        source,
                        maintainedBy,
                        date,
                        updateCycle,
                        distribution,
                        contact,
                        documentation,
                        notes,
                        webService,
                        template,
                        internal,
                        category1,
                        category2,
                        category3,
                        scale,
                        layerStatus`;
const nestedInfoSchema = `dataCatalogId,name,type,status,updated,info{
                            ${infoSchema}
                        }`;
export const getCatalogRows = ()=>{
    return (dispatch,getState)=>{
        const query = getState().dataQuery;
        return client.post('/api',{
            query:`{
                catalogRows(limit:100, ${query}){
                    ${nestedInfoSchema}
                }
            }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            let rows = res.data.data.catalogRows;
            let infoRows = res.data.data.catalogRows.map((item, i)=>{
                return Object.assign({}, item.info, {updated: rows[i].updated, name: rows[i].name, status:rows[i].status});
            })
            dispatch(setTableData(infoRows));
        });
    };
};
export const getDomainCategories = () =>{
    return (dispatch,getState)=>{
        return client.post('/api',{
            query:`{
                domainCategories{
                    primary,secondary,tertiary
                }
            }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            const tbl = res.data.data.domainCategories;
            let data = {};
            function makeSet(query = tbl=>tbl,key){
                return query(tbl).map(f=>f[key]).filter(n=>n !== null);
            }
            let schema = new Set(tbl.map(f=>f.primary));
            for(let p of schema){
                data[p] = [];
                let secondary = makeSet( t=>t.filter(f=>f.primary === p), 'secondary');
                for(let s of secondary){
                    data[p][s] = makeSet(t=>t.filter(f=>f.primary === p && f.secondary == s), 'tertiary');
                }
            }
            dispatch({
                type: types.GET_DOMAIN_CATEGORIES,
                payload: data
            });
        });
    }
};
export const startChangeInformation = model =>{
    return (dispatch,getState)=>{
        return client.post('/api',{
            query: `
            mutation{
                changeInformation(${model.stringify()}){
                    ${infoSchema}
                }
            }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            let newInfo = res.data.data.changeInformation;
            toastr.success('Catalog updated successfully');
            dispatch(getCatalogRows());
            dispatch(overwriteCurrentRecordAction(newInfo));
        });
    }
}