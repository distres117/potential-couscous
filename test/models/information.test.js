import { expect } from 'chai';
import { graphql } from 'graphql';
import { Schema } from '../../db/schemas';
import { connect, models } from '../../db';
import Sequelize from 'sequelize';
import {InformationModel} from '../../app/client/models/information.model';
import * as _ from 'lodash';

describe.only('information model and api tests', ()=>{
    let rowId;
    before(()=>{
        return connect(true)
        .then(async ()=>{
            let catalogRow = await models.DataCatalog.create({name:'TestRow'});
            rowId = catalogRow.dataCatalogId;
            return models.Information.create({title:'Test info', dataCatalogId: rowId});
        });
    });
    it('should update an existing information record', ()=>{
        let model = new InformationModel();
        model.prePopulate(null, {
            abstract: 'stupid test abstract',
            title:'this should change',
            purpose:'who knows',
            dataCatalogId: rowId
        });
        expect(model.isValid()).true;
        let query = `
            mutation{
                changeInformation(${model.stringify()}){
                    title,abstract,dataCatalogId,purpose
                }
            }
        `;
        return graphql(Schema,query)
        .then(res=>{
            if (res.errors)
                console.log(res.errors);
            let data = res.data.changeInformation;
            expect(res.errors).to.be.undefined;
            expect(data.title).equals('this should change');
            expect(data.purpose).equals('who knows');
        });
    });
});