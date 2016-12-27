import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';

const fieldType = new GraphQLObjectType({
    name: 'Field',
    description: 'a field in a dataset',
    fields: ()=>{
        return _.assign(attributeFields(models.Field));
    }
});

export default fieldType;