import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';
import dataCatalogType from './dataCatalogType';

const disbursementType = new GraphQLObjectType({
    name: 'Disbursement',
    description: 'a disbursement of a dataset',
    fields: ()=>{
        return _.assign(attributeFields(models.Disbursement),{
            catalogRow:{
                type: dataCatalogType,
                resolve(row){
                    return row.getDataCatalog();
                }
            }
        });
    }
});

export default disbursementType;