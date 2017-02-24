import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import {models} from '../../../db';
import {attributeFields} from 'graphql-sequelize';
import disbursementType from '../types/disbursementType';
import * as _ from 'lodash';

export default{
    newDisbursement:{
        type: disbursementType,
        args: _.assign(attributeFields(models.Disbursement, {exclude: ['disbursementId']} )),
        resolve(source,args){
            args.date = Date.now();
            return models.Disbursement.create(_.assign(args));
        }
    },
    changeDisbursement:{
        type:disbursementType,
        args:_.assign(attributeFields(models.Disbursement)),
        async resolve(source, args){
            let disbursement = await models.Disbursement.findById(args.disbursementId);
            return disbursement.update(_.assign(_.omit(args,['organizationId'])));
        }
    }
}