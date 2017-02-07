import client from '../../services/axios.service';
import {toastr} from 'react-redux-toastr';
import {setPeopleAction, getAppUserAction} from './app.actions';
import {setTableData} from './common.actions';
import {convertToLookup} from '../../helpers/flter.helpers';
import format from '../../helpers/format.helpers';

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
                    dispatch(getAppUserAction(orgs[0].people)); 
                dispatch(setPeopleAction(items));
            }
            else
                toastr.error('Organization was not found');
        });
    };
}

export const startGetAllPeopleAction = ()=>{
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
            let people =  format.flatten(res.data.data.people);
            dispatch(setTableData(people));
        });
    }
}

export const filterByOrgAction = (org, baseData)=>{
    return (dispatch,getState)=>{
        if (!org){
            dispatch(setTableData(baseData));
            return;
        }
        let filteredData = baseData.filter(val=>val.abbrev === org);
        dispatch(setTableData(filteredData));
    }
}