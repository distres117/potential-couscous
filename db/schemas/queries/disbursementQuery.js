import {GraphQLList} from 'graphql';
import disbursementType from '../types/disbursementType';
import {models} from '../../../db';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import * as _ from 'lodash';

export default {
    disbursements:{
        type: new GraphQLList(disbursementType),
        args: _.assign(attributeFields(models.Disbursement, {allowNull:true}), _.assign(defaultListArgs())),
        resolve:resolver(models.Disbursement)
    }
}