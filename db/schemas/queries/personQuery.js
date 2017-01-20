import * as _ from 'lodash';
import {GraphQLList} from 'graphql';
import personType from '../types/personType';
import {models} from '../../../db';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';

export default {
    people:{
        type: new GraphQLList(personType),
        args: _.assign(attributeFields(models.Person, {allowNull:true}), _.assign(defaultListArgs())),
        resolve: resolver(models.Person)
    }
}