import {GraphQLList} from 'graphql';
import layerType from '../types/layerType';
import {models} from '../../../db';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import * as _ from 'lodash';

export default {
    layers:{
        type: new GraphQLList(layerType),
        args: _.assign(attributeFields(models.Layer, {allowNull:true}), _.assign(defaultListArgs())),
        resolve:resolver(models.Layer)
    }
}