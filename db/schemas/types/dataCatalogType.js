import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import transactionType from './transactionType';
import informationType from './informationType';
import featureClassType from './featureClassType';
import layerType from './layerType';
import keywordType from './keywordType';
import fieldType from './fieldType';
import gdbType from './gdbType';
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
            featureClasses:{
                type: featureClassType,
                resolve(row){
                    return row.getFeatureClass();
                }
            },
            gdb:{
                type:gdbType,
                resolve(row){
                    return row.getEnterpriseGdb();
                }
            },
            info:{
                type:informationType,
                resolve(row){
                    return row.getInformation();
                }
            },
            fields:{
                type:new GraphQLList(fieldType),
                resolve(row){
                    return row.getFields();
                }
            },
            keywords:{
                type:new GraphQLList(keywordType),
                resolve(row){
                    return row.getKeywords();
                }
            },
            layers:{
                type:new GraphQLList(layerType),
                resolve(row){
                    return row.getLayers();
                }
            }
            


    })
    }
});

export default dataCatalogType;