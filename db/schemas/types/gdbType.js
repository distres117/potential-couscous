import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';

const gdbType = new GraphQLObjectType({
    name: 'EnterpriseGdb',
    description: 'connection information concerning a dataset',
    fields: ()=>{
        return _.assign(attributeFields(models.EnterpriseGdb));
    }
});

export default gdbType;