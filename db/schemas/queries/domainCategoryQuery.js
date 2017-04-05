import {GraphQLList, GraphQLString} from 'graphql';
import domainCategoryType from '../types/domainCategoryType';
import {models} from '../../../db';
import * as _ from 'lodash';

export default {
    domainCategories:{
        type: new GraphQLList(domainCategoryType),
        args: {
            primary: {type: GraphQLString},
            secondary: {type: GraphQLString},
            tertiary: {type: GraphQLString}
        },
        resolve(root,args){//only grab distinct values since this table was poorly set up
            return models.DomainCategory.findAll();
        }
    }
}