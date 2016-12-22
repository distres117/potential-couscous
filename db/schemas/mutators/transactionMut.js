import {GraphQLString, GraphQLNonNull} from 'graphql';
import transactionType from '../types/transactionType';
import {models} from '../../../db';
import {attributeFields} from 'graphql-sequelize';
import {getDetails} from '../../../app/services/acpyService';
import * as _ from 'lodash';

export default {
    newTransaction:{
        type:transactionType,
        args: _.assign(attributeFields(models.Transaction, {exclude:['transactionId']}),{
            datasetName: {
                type: new GraphQLNonNull(GraphQLString)
            },
            datasetType:{
                type: new GraphQLNonNull(GraphQLString)
            }
        }),
        async resolve(source,args){
            let type = 'SDE Feature Class';
            if (args.datasetType === 'table')
                type = 'SDE Table';
            else if (args.datasetType === 'raster')
                type = 'SDE Raster Dataset';
            const catalogRow = await models.DataCatalog.create({
                type
            });
            let {data} = await getDetails(args.datasetName,args.datasetType);  
            const transaction = await models.Transaction.create(_.assign(_.omit(args, ['datasetName','datasetType']), {
                dataCatalogId: catalogRow.dataCatalogId
            }));
            return transaction;
        }
    }
}