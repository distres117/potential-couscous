import {GraphQLObjectType, GraphQLSchema, GraphQLList} from 'graphql';
import {models} from '../index';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import dataCatalogQuery from './queries/dataCatalogQuery';
import transactionQuery from './queries/transactionQuery';
import featureClassQuery from './queries/featureClassQuery';
import organizationQuery from './queries/organizationQuery';
import disbursementQuery from './queries/disbursementQuery';
import layerQuery from './queries/layerQuery';
import personQuery from './queries/personQuery';
import keywordQuery from './queries/keywordQuery';
import transactionMut from './mutators/transactionMut';
import organizationMut from './mutators/organizationMut';
import personMut from './mutators/peopleMut';
import * as _ from 'lodash';
const rootQueryFields = Object.assign(dataCatalogQuery, transactionQuery, featureClassQuery, keywordQuery, personQuery, organizationQuery, layerQuery, disbursementQuery);
const rootMutateFields = Object.assign(transactionMut, personMut, organizationMut);
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