import {GraphQLList} from 'graphql';
import featureClassType from '../types/featureClassType';
import {models} from '../../../db';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import * as _ from 'lodash';

export default {
    featureClasses:{
        type: new GraphQLList(featureClassType),
        args: _.assign(attributeFields(models.FeatureClass, {allowNull:true}), _.assign(defaultListArgs())),
        resolve:resolver(models.FeatureClass)
    }
}