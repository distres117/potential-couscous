import {GraphQLList} from 'graphql';
import domainFormatType from '../types/domainFormatType';
import {models} from '../../../db';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import * as _ from 'lodash';

export default {
    domainFormats:{
        type: new GraphQLList(domainFormatType),
        args: _.assign(attributeFields(models.DomainFormat, {allowNull:true}), _.assign(defaultListArgs())),
        resolve:resolver(models.DomainFormat)
    }
}