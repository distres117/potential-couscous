import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';
import organizationType from './organizationType';

const personType = new GraphQLObjectType({
    name: 'Person',
    description: 'a person',
    fields: ()=>{
        return _.assign(attributeFields(models.Person), {
            organization:{
                type: organizationType,
                resolve(row){
                    return row.getOrganization();
                }
            }
        });
    }
});

export default personType;