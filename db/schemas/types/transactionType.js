import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';
import dataCatalogType from './dataCatalogType'

const transactionType = new GraphQLObjectType({
    name: 'Transaction',
    description: 'a datacatalog transaction',
    fields: ()=>{
        return _.assign(attributeFields(models.Transaction),{
            catalogRow:{
                type:dataCatalogType,
                resolve(row){
                    return row.getDataCatalog();
                }
            }
        })
    }
})

export default transactionType;