import * as _ from 'lodash';
import {models} from '../../index';
import {attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLList} from 'graphql';

const keywordType = new GraphQLObjectType({
    name: 'Keyword',
    description: 'a keyword to describe a dataset',
    fields: ()=>{
        return _.assign(attributeFields(models.Keyword));
    }
});

export default keywordType;