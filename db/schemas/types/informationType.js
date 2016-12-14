import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';
import dataCatalogType from './dataCatalogType'

const informationType = new GraphQLObjectType({
    name: 'Information',
    description: 'information concerning a data catalog entry',
    fields: ()=>{
        return _.assign(attributeFields(models.Information))
    }
})

export default informationType;