import {GraphQLObjectType, GraphQLSchema, GraphQLList} from 'graphql';
import {models} from '../index';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import dataCatalogQuery from './queries/dataCatalogQuery';
import transactionQuery from './queries/transactionQuery';
import featureClassQuery from './queries/featureClassQuery';
import organizationQuery from './queries/organizationQuery';
import disbursementQuery from './queries/disbursementQuery';
import domainCategoryQuery from './queries/domainCategoryQuery';
import orgTypeQuery from './queries/orgTypeQuery';
import stateQuery from './queries/stateQuery';
import layerQuery from './queries/layerQuery';
import personQuery from './queries/personQuery';
import keywordQuery from './queries/keywordQuery';
import domainFormatQuery from './queries/domainFormatQuery';
import domainTransmittalQuery from './queries/domainTransmittalQuery';
import transactionMut from './mutators/transactionMut';
import organizationMut from './mutators/organizationMut';
import disbursementMut from './mutators/disbursementMut';
import informationMut from './mutators/informationMut';
import personMut from './mutators/peopleMut';
import * as _ from 'lodash';
const rootQueryFields = Object.assign(
    dataCatalogQuery, transactionQuery, featureClassQuery, 
    keywordQuery, personQuery, organizationQuery, 
    layerQuery, disbursementQuery, stateQuery, orgTypeQuery, 
    domainFormatQuery,domainTransmittalQuery, domainCategoryQuery);

const rootMutateFields = Object.assign(transactionMut, personMut, organizationMut, disbursementMut, informationMut);
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