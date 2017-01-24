import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import {models} from '../../../db';
import {attributeFields} from 'graphql-sequelize';
import personType from '../types/personType';
import * as _ from 'lodash';

export default{
    newPerson:{
        type: personType,
        args: _.assign(attributeFields(models.Person, {exclude: ['personId']} )),
        async resolve(source,args){
            const person = await models.Person.create(_.assign(args));
            return person;
        }
    }
}