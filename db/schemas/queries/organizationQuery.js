import {GraphQLList} from 'graphql';
import organizationType from '../types/organizationType';
import {models} from '../../../db';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import * as _ from 'lodash';

export default {
    organizations:{
        type: new GraphQLList(organizationType),
        args: _.assign(attributeFields(models.Organization, {allowNull:true}), _.assign(defaultListArgs())),
        resolve:resolver(models.Organization)
    }
}