import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList, GraphQLString} from 'graphql';

const domainCategoryType = new GraphQLObjectType({
    name: 'DomainCategory',
    description: 'a set of defined categories for a dataset',
    fields: ()=>{
        return {
            primary:{
                type: GraphQLString,
                resolve(row){
                    return row.primary;
                }
            },
            secondary:{
                type: GraphQLString,
                resolve(row){
                    return row.secondary;
                }
            },
            tertiary:{
                type: GraphQLString,
                resolve(row){
                    return row.tertiary;
                }
            }
        }
    }
});

export default domainCategoryType;