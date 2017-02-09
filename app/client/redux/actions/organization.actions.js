import client from '../../services/axios.service';
import types from './action.types';

const organizationSchema = 'organizationId, name, abbrev';

export const startGetOrganizationsAction = (query = '')=>{
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
            dispatch({
                type: types.GET_ORGANIZATIONS,
                payload: res.data.data.organizations
            })
        })
    }
}