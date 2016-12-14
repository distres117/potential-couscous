import {GraphQLObjectType, GraphQLSchema, GraphQLList} from 'graphql';
import dataCatalogType from './types/dataCatalogType';
import transactionType from './types/transactionType';
import {models} from '../index';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import * as _ from 'lodash';

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields:()=>{
        return{
            catalogRows: {
                type: new GraphQLList(dataCatalogType),
                args: _.assign(attributeFields(models.DataCatalog, {exclude: ['dataCatalogId']}), _.assign(defaultListArgs())),
                resolve: resolver(models.DataCatalog)
            },
            transactions:{
                type: new GraphQLList(transactionType),
                args: _.assign(attributeFields(models.Transaction, {exclude: ['transactionId']}), _.assign(defaultListArgs())),
                resolve:resolver(models.Transaction)
            }
        }
    }

});

export const Schema = new GraphQLSchema({
    query: Query
}); 