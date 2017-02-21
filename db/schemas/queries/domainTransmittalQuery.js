import {GraphQLList} from 'graphql';
import domainTransmittalType from '../types/domainTransmittalType';
import {models} from '../../../db';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import * as _ from 'lodash';

export default {
    transmittalTypes:{
        type: new GraphQLList(domainTransmittalType),
        args: _.assign(attributeFields(models.DomainTransmittal, {allowNull:true}), _.assign(defaultListArgs())),
        resolve:resolver(models.DomainTransmittal)
    }
}