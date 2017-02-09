import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';

const stateType = new GraphQLObjectType({
    name: 'State',
    description: 'an state in the US',
    fields: ()=>{
        return _.assign(attributeFields(models.State));
    }
});

export default stateType;