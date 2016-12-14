import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import transactionType from './transactionType';
import informationType from './informationType';
import {GraphQLObjectType, GraphQLList} from 'graphql';

const dataCatalogType = new GraphQLObjectType({
    name: 'DataCatalog',
    description: 'an entry in the data catalog',
    fields: ()=>{
        return _.assign(attributeFields(models.DataCatalog),{
            transactions:{
                type:new GraphQLList(transactionType),
                resolve(row){
                    return row.getTransactions();
                }
            },
            information:{
                type: informationType,
                resolve(row){
                    return row.getInformation();
                }
            }
    })
    }
});

export default dataCatalogType;