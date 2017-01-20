import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';
import personType from './personType';

const organizationType = new GraphQLObjectType({
    name: 'Organization',
    description: 'an organization',
    fields: ()=>{
        return _.assign(attributeFields(models.Organization),{
            people:{
                type: new GraphQLList(personType),
                resolve(row){
                    return row.getPeople();
                }
            }
        })
    }
});

export default organizationType;