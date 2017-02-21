import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';

const domainTransmittalType = new GraphQLObjectType({
    name: 'DomainTransmittal',
    description: 'a method of transmittal for a disbursement',
    fields: ()=>{
        return _.assign(attributeFields(models.DomainTransmittal));
    }
});

export default domainTransmittalType;