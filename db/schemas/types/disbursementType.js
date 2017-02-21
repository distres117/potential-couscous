import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';
import dataCatalogType from './dataCatalogType';
import domainFormatType from './domainFormatType';
import personType from './personType';
import domainTransmittalType from './domainTransmittalType';

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
            },
            format:{
                type: domainFormatType,
                resolve(row){
                    return models.DomainFormat.findById(row.formatId);
                }
            },
            transmittal:{
                type: domainTransmittalType,
                resolve(row){
                    return models.DomainTransmittal.findById(row.transmittalId)
                }
            },
            recipientPerson:{
                type: personType,
                resolve(row){
                    return models.Person.findById(row.recipient);
                }
            },
            providerPerson:{
                type: personType,
                resolve(row){
                    return models.Person.findById(row.provider);
                }
            }
        });
    }
});

export default disbursementType;