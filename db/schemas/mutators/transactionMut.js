import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import transactionType from '../types/transactionType';
import recordTransactionFn from './transaction/recordTransaction';
import { models } from '../../../db';
import { attributeFields } from 'graphql-sequelize';
import { getDetails, getDetailsGp } from '../../../app/services/acpyService';
import { dataType, dataTypeString, errorRes, dataTypeSimple, tryMe } from '../../../app/utils/translators';
import chalk from 'chalk';
import * as _ from 'lodash';

async function archiveOrDelete(action) {
    const transaction = await models.Transaction.findById(args.archiveTransactionId);
    const catalogRow = await transaction.getDataCatalog();
    if (!catalogRow)
        return;
    let updatedTransaction = await transaction.update({ action: action === 'Archive' ? action : 'Delete' });
    let updatedCatalogRow = await catalogRow.update({ status: action });
    return updatedTransaction;
}

export default {
    newTransaction: {
        type: transactionType,
        args: _.assign(attributeFields(models.Transaction, { exclude: ['transactionId'] })),
        async resolve(source, args) {
            let type = dataType(args.datasetType);
            
            const transaction = await models.Transaction.create(_.assign(args, {
                submitDate: Date.now()
            }));
            return transaction;
        }
    },
    changeTransaction: {
        type: transactionType,
        args: _.assign(attributeFields(models.Transaction)),
        async resolve(source, args) {
            const transaction = await models.Transaction.findById(args.transactionId);
            if (!transaction)
                return errorRes('transaction not found');
            return transaction.update( _.assign(_.omit(args, ['transactionId']), {
                reviewDate: Date.now()
            }));
        }
    },
    recordTransaction: {
        type: transactionType,
        args: _.assign(attributeFields(models.Transaction, { only: ['transactionId', 'submitName', 'sdePerson'] })),
        resolve: recordTransactionFn
    },
    archiveTransaction: { //creates a new row in transactions
        type: transactionType,
        args: _.assign(attributeFields(models.Transaction, { exclude: ['transactionId'] })),
        async resolve(source, args) {

            const updatedTransaction = await archiveOrDelete('Archive');
            return updatedTransaction;
        }
    },
    deleteTransaction: {
        type: transactionType,
        args: {
            deleteTransactionId: {
                type: new GraphQLNonNull(GraphQLInt)
            }
        },
        async resolve(source, args) {
            const updatedTransaction = await archiveOrDelete('Retired');
            return updatedTransaction;
        }
    },
    renameTransaction: {
        type: transactionType,
        args: {
            renameTransactionId: {
                type: new GraphQLNonNull(GraphQLInt)
            }
        },
        async resolve(source, args) {
            const transaction = await models.Transaction.findById(args.archiveTransactionId);
            const catalogRow = await transaction.getDataCatalog();
            if (!catalogRow)
                return;
            let updatedTransaction = await transaction.update({ action: action === 'Archive' ? action : 'Delete' });
            let updatedCatalogRow = await catalogRow.update({ status: action });
            return updatedTransaction;
        }
    }
}