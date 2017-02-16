import client from '../../services/axios.service';
import types from './action.types';
import {setTableData} from './common.actions';
import {clearCurrentRecordAction} from './app.actions';
import {toastr} from 'react-redux-toastr';
const organizationSchema = 'organizationId, name, abbrev';

export const startGetOrganizationsAction = (toTable = true)=>{
    return (dispatch,getState)=>{
        return client.post('/api',{
            query:`{
                organizations{
                    ${organizationSchema}
                }
            }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            if (!toTable){
                dispatch({
                    type: types.GET_ORGANIZATIONS,
                    payload: res.data.data.organizations
                })
            }else{
                dispatch(setTableData(res.data.data.organizations));
            }
        })
    }
}
export const startCommitOrganizationAction = model =>{
    return (dispatch, getState)=>{
        return client.post('/api', {
            query:`
                mutation{
                    newOrganization(${model.stringify()}){
                        ${organizationSchema}
                    }
                }
            `
        })
        .then(res=>{
            if (res.data.errors)
                return;
            toastr.success('Organization added successfully');
            dispatch(startGetOrganizationsAction());
            dispatch(clearCurrentRecordAction());
        })
    }
}
export const startChangeOrganizationAction = (id,model)=>{
    return (dispatch, getState)=>{
        return client.post('/api',{
            query:`
                mutation{
                    changeOrganization(organizationId:${id}, ${model.stringify()}){
                        ${organizationSchema}
                    }
                }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            toastr.success('Organization updated successfully');
            dispatch(startGetOrganizationsAction());
        });
    }
}