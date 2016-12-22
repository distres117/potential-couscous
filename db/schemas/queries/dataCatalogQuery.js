import {GraphQLList} from 'graphql';
import dataCatalogType from '../types/dataCatalogType';
import {models} from '../../../db';
import {resolver, attributeFields, defaultListArgs} from 'graphql-sequelize';
import * as _ from 'lodash';

export default {
    catalogRows: {
        type: new GraphQLList(dataCatalogType),
        args: _.assign(attributeFields(models.DataCatalog, {allowNull:true}), _.assign(defaultListArgs())),
        resolve: resolver(models.DataCatalog)
    }
}