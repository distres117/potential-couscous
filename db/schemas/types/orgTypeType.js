import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';

const orgTypeType = new GraphQLObjectType({
    name: 'OrgType',
    description: 'a type of organization',
    fields: ()=>{
        return _.assign(attributeFields(models.OrgType));
    }
});

export default orgTypeType;