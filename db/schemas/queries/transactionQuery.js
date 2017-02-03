import {GraphQLList} from 'graphql';
import transactionType from '../types/transactionType';
import {models} from '../../../db';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import * as _ from 'lodash';

function schema(){
    return {
        type: new GraphQLList(transactionType),
        args: _.assign(attributeFields(models.Transaction, {allowNull:true}), _.assign(defaultListArgs())),
        resolve:resolver(models.Transaction)
    }
}
export default {
    transactions: schema(),
    closedTransactions:schema()
    
}