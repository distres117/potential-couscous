import {GraphQLList} from 'graphql';
import stateType from '../types/stateType';
import {models} from '../../../db';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import * as _ from 'lodash';

export default {
    states:{
        type: new GraphQLList(stateType),
        args: _.assign(attributeFields(models.State, {allowNull:true}), _.assign(defaultListArgs())),
        resolve:resolver(models.State)
    }
}