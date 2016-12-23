import {GraphQLInt, GraphQLString, GraphQLNonNull} from 'graphql';
import transactionType from '../types/transactionType';
import {models} from '../../../db';
import {attributeFields} from 'graphql-sequelize';
import {getDetails, getDetailsGpOnly} from '../../../app/services/acpyService';
import {dataType, dataTypeString, errorRes, dataTypeSimple} from'../../../app/utils/translators';
import * as _ from 'lodash';

async function archiveOrDelete(action){
    const transaction = await models.Transaction.findById(args.archiveTransactionId);
    const catalogRow = await transaction.getDataCatalog();
    if (!catalogRow)
        return;
    let updatedTransaction = await transaction.update({action: action === 'Archive' ? action: 'Delete' });
    let updatedCatalogRow = await catalogRow.update({status:action});
    return updatedTransaction;
}

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
            let type = dataTypeString(args.datasetType);  
            const transaction = await models.Transaction.create(_.assign(_.omit(args, ['datasetName','datasetType']), {
                submitGdb: 'I:\\SDE_IMPORT\\READY_TO_LOAD\\Data_to_import.gdb',
                submitDate: Date.now(),
                action: 'New',
                submitName: args.datasetName,
                dataType: dataType(type) 
            }));
            return transaction;
        }
    },
    changeTransaction:{
        type:transactionType,
        args: _.assign(attributeFields(models.Transaction)),
        async resolve(source,args){
            const transaction = await models.Transaction.findById(args.transactionId);
            if (!transaction)
                return errorRes('transaction not found');
            return transaction.update(_.omit(args, ['transactionId']));
        }
    },
    recordTransaction:{
        type:transactionType,
        args: _.assign(attributeFields(models.Transaction, {only:['transactionId']})),
        async resolve(source, args){
            let transaction = await models.Transaction.findById(args.transactionId);
            if (!transaction)
                return errorRes('transaction not found');
            //create common values
            let loadName =`sde.SDE.${transaction.submitName}`;
            let type = dataTypeString(transaction.dataType);
            let {data} = await getDetailsGpOnly(transaction.submitName, dataTypeSimple(transaction.dataType));
            //create new DataCatalog row
            let catalogRow = await models.DataCatalog.create({
                status: 'Production', 
                loadName, 
                type
            });
            //create feature class/raster/table row
            if (transaction.dataType === 1){
                let featureClassRow = await models.Featureclass.create({
                    dataCatalogId:catalogRow.dataCatalogId,
                    dataType:type,
                    featureClass:loadName,
                    featureType: data.results[0].value.featureType,
                    geometryType: data.results[0].value.shapeType
                });

            } //TODO: Conditions for other dataset types
            //create fields data rows
            let fieldPromises = data.results[0].value.fields.map(field=>{
                return models.Field.create({
                    //TODO: Add field attributes
                })
            });
            let fieldRows = await Promise.all(fieldPromises);
            //create information row
            //update transaction row to reflect change
            
            //let {data} = await getDetails(args.datasetName,args.datasetType);
        }
    },
    updateTransaction:{
        type:transactionType,
        args: _.assign(attributeFields(models.Transaction, {exclude:['transactionId']}),{
            updateType: {
                type: new GraphQLNonNull(GraphQLString)
            },
            updateTransactionId:{
                type: new GraphQLNonNull(GraphQLInt)
            }
        }),
        async resolve(source,args){
            let action = `Update (${args.updateType})`;
            let transaction = await models.Transaction.findById(args.updateTransactionId);
            if (!transaction)
                return;
            let updateData = _.assign(args,{action});
            let updatedTransaction = await transaction.update(updateData);
            return newTransaction;
        }

    },
    archiveTransaction:{
        type: transactionType,
        args: {
            archiveTransactionId:{
                type: new GraphQLNonNull(GraphQLInt)
            }
        },
        async resolve(source,args){
           const updatedTransaction = await archiveOrDelete('Archive');
           return updatedTransaction;
        }
    },
    deleteTransaction:{
        type: transactionType,
        args: {
            deleteTransactionId:{
                type: new GraphQLNonNull(GraphQLInt)
            }
        },
        async resolve(source,args){
           const updatedTransaction = await archiveOrDelete('Retired');
           return updatedTransaction;
        }
    },
    renameTransaction:{
        type:transactionType,
        args:{
            renameTransactionId:{
                type: new GraphQLNonNull(GraphQLInt)
            }
        },
        async resolve(source,args){
            const transaction = await models.Transaction.findById(args.archiveTransactionId);
            const catalogRow = await transaction.getDataCatalog();
            if (!catalogRow)
                return;
            let updatedTransaction = await transaction.update({action: action === 'Archive' ? action: 'Delete' });
            let updatedCatalogRow = await catalogRow.update({status:action});
            return updatedTransaction;
        }
    }
}