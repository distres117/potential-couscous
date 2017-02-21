import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';

const domainFormatType = new GraphQLObjectType({
    name: 'DisbursementFormat',
    description: 'a type of disbursement',
    fields: ()=>{
        return _.assign(attributeFields(models.DomainFormat));
    }
});

export default domainFormatType;