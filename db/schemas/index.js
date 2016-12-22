import {GraphQLObjectType, GraphQLSchema, GraphQLList} from 'graphql';
import dataCatalogType from './types/dataCatalogType';
import transactionType from './types/transactionType';
import {models} from '../index';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import dataCatalogQuery from './queries/dataCatalogQuery';
import transactionQuery from './queries/transactionQuery';
import transactionMut from './mutators/transactionMut';
import * as _ from 'lodash';
const rootQueryFields = Object.assign(dataCatalogQuery, transactionQuery);
const rootMutateFields = Object.assign(transactionMut);
const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields:()=>rootQueryFields
});

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'for creating new database objects',
    fields:()=>rootMutateFields
})

export const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
}); 