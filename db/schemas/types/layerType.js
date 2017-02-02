import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';
import dataCatalogType from './dataCatalogType';

const layerType = new GraphQLObjectType({
    name: 'Layer',
    description: 'an ESRI layer file',
    fields: ()=>{
        return _.assign(attributeFields(models.Layer),{
            catalogRow:{
                type: dataCatalogType,
                resolve(row){
                    return row.getDataCatalog();
                }
            }
        });
    }
});

export default layerType;