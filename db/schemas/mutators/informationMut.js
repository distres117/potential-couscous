import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import {models} from '../../../db';
import {attributeFields} from 'graphql-sequelize';
import informationType from '../types/informationType';
import * as _ from 'lodash';

export default{
    changeInformation:{
        type: informationType,
        args: _.assign(attributeFields(models.Information)),
        async resolve(source, args){
            let information = await models.Information.findOne({where: {dataCatalogId: args.dataCatalogId}});
            return information.update(_.assign(_.omit(args,['dataCatalogId'])));  
        }
    }
}