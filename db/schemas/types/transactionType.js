import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';
import dataCatalogType from './dataCatalogType';
import layerType from './layerType';

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
            },
            layers: {
                type: new GraphQLList(layerType),
                async resolve(row){
                    let catalogRow = await row.getDataCatalog();
                    let layers = [];
                    if (catalogRow){
                        layers = await catalogRow.getLayers();
                    }
                    return layers;
                } 
            }
        })
    }
})

export default transactionType;