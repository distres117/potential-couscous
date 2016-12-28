import {GraphQLList, GraphQLString} from 'graphql';
import keywordType from '../types/keywordType';
import dataCatalogType from '../types/dataCatalogType';
import {models} from '../../../db';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import * as _ from 'lodash';

export default {
    keywords: {
        type: new GraphQLList(keywordType),
        args: {
            keyword:{type:GraphQLString}
        },
        resolve(root,args){
            return models.Keyword.findAll({
                where:{
                    keyword:{
                        $like: args.keyword + '%'
                    }
                }
            });
        }
    }
}