import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import fieldType from './fieldType';
import {GraphQLObjectType, GraphQLList} from 'graphql';

const featureClassType = new GraphQLObjectType({
    name: 'FeatureClass',
    description: 'a feature class type of dataset',
    fields: ()=>{
        return _.assign(attributeFields(models.FeatureClass));
    }
});

export default featureClassType;