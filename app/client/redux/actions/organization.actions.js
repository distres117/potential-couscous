import client from '../../services/axios.service';
import types from './action.types';
import {setTableData} from './common.actions';
import {clearCurrentRecordAction, overwriteCurrentRecordAction} from './app.actions';
import {toastr} from 'react-redux-toastr';
import format from '../../helpers/format.helpers';
const organizationSchema = 'organizationId, name, abbrev, orgTypeId';

export const startGetOrganizationsAction = (toTable = true)=>{
    return (dispatch,getState)=>{
        return client.post('/api',{
            query:`{
                organizations(order:"name"){
                    ${organizationSchema},orgType{
                        type
                    }
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
                let organizations = format.flatten(res.data.data.organizations);
                dispatch(setTableData(organizations));
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
            dispatch(overwriteCurrentRecordAction(res.data.data.changeOrganization));
        });
    }
}
export const startGetOrgTypes = ()=>{
    return (dispatch, getState)=>{
        return client.post('/api',{
            query:`{
                orgTypes{
                    orgTypeId, type
                }
            }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            dispatch({
                type:types.GET_ORG_TYPES,
                payload: res.data.data.orgTypes
            });
        });
    }
} 