import {GraphQLList} from 'graphql';
import orgTypeType from '../types/orgTypeType';
import {models} from '../../../db';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import * as _ from 'lodash';

export default {
    orgTypes:{
        type: new GraphQLList(orgTypeType),
        args: _.assign(attributeFields(models.OrgType, {allowNull:true}), _.assign(defaultListArgs())),
        resolve:resolver(models.OrgType)
    }
}