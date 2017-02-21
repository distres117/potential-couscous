import client from '../../services/axios.service';
import {toastr} from 'react-redux-toastr';
import {setPeopleAction, setAppUserAction} from './app.actions';
import {setTableData, commitTableData} from './common.actions';
import {clearCurrentRecordAction} from './app.actions';
import {convertToLookup} from '../../helpers/flter.helpers';
import format from '../../helpers/format.helpers';
import types from './action.types';

const peopleSchema = `
                    personId,
                    title,
                    firstName,
                    middleName,
                    lastName,
                    fullName,
                    position,
                    organizationId,
                    division,
                    contractor,
                    address1,
                    address2,
                    city,
                    state,
                    zip,
                    phone,
                    extension,
                    eMail,
                    notes,
                    userName,
                    OrganizationID`;


export const startGetOrgPeopleAction = (query)=>{
    //getting poeple for a specific agency
    return (dispatch,getState)=>{
        return client.post('/api',{
            query:`{
                organizations(abbrev:"${query}"){
                    people{
                        ${peopleSchema}
                    }
                }
            }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            let orgs = res.data.data.organizations;
            if (orgs.length){
                let items = convertToLookup(orgs[0].people, 'personId', 'fullName')
                if (!getState().currentUser)
                    dispatch(setAppUserAction(orgs[0].people)); 
                dispatch(setPeopleAction(items));
            }
            else
                toastr.error('Organization was not found');
        });
    };
}

export const startGetAllPeopleAction = (toTable = true)=>{
    return (dispatch, getState)=>{
        return client.post('/api',{
            query: `{
                people(order:"lastName"){
                    ${peopleSchema}, organization{
                        abbrev, organizationId, name
                    }
                }
            }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            if (!toTable){
                dispatch({
                    type: types.SET_PEOPLE,
                    payload: convertToLookup(res.data.data.people, 'personId', 'fullName')
                });
            }else{
                let people =  format.flatten(res.data.data.people);
                dispatch(setTableData(people));
            }
        });
    }
}

export const startGetStates = ()=>{
    return (dispatch, getState)=>{
        return client.post('/api',{
            query:`{
                states{
                    abbreviation, stateId, state
                }
            }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            dispatch({
                type: types.GET_STATES,
                payload: res.data.data.states
            })
        })
    }
}

export const filterByOrgAction = (org, baseData)=>{
    return (dispatch,getState)=>{
        if (!org){
            dispatch(setTableData(baseData));
            return;
        }
        let filteredData = baseData.filter(val=>val.organizationId === org);
        dispatch(setTableData(filteredData));
    }
}
export const startCommitPersonAction = model =>{
    return (dispatch, getState)=>{
        return client.post('/api', {
            query:`
                mutation{
                    newPerson(${model.stringify()}){
                        ${peopleSchema}
                    }
            }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            toastr.success('Person successfully added');
            dispatch(startGetAllPeopleAction());
            dispatch(clearCurrentRecordAction());
        });
    }
}
export const startUpdatePersonAction = (id, model)=>{
    return (dispatch, getState)=>{
        console.log(model.stringify());
        return client.post('/api',{
            query:`
                mutation{
                    changePerson(personId:${id}, ${model.stringify()}){
                        ${peopleSchema}
                    }
                }
            `
        })
        .then(res=>{
            if (res.data.errors){
                return;
            }
            toastr.success('Person updated successfully');
            dispatch(startGetAllPeopleAction());
        })
    }
}