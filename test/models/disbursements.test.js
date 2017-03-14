import { expect } from 'chai';
import { graphql } from 'graphql';
import { Schema } from '../../db/schemas';
import { connect, models } from '../../db';
import Sequelize from 'sequelize';
import {DisbursementModel} from '../../app/client/models/disbursement.model';
import * as _ from 'lodash';

xdescribe('disbursement model and api tests', ()=>{
    before(()=>{
        return connect(true);
    })
    it('should create a new disbursement', ()=>{
        let model = new DisbursementModel();
        model.prePopulate(null, {
            recipient: '1',
            contractor: '2',
            provider: '3',
            formatId: '1',
            transmittalId: '1',
            dataCatalogId: '1'
        });
        //expect(model.isValid()).is.true;
        let query = `
            mutation{
                newDisbursement(${model.stringify()}){
                    disbursementId
                }
            }
        `;
        return graphql(Schema, query)
        .then(res=>{
            console.log(res.errors[0]);
            expect(res.errors).to.be.undefined;
            expect(res.data.newDisbursement.disbursementId).equals(1);
        });
    });
    it('should update created disbursement', ()=>{
        let model = new DisbursementModel();
        model.prePopulate(null, {
            recipient: '2',
            contractor: '2',
            provider: '3',
            formatId: '1',
            transmittalId: '1',
            notes: 'blah blah',
            dataCatalogId: '1'
        });
        //expect(model.isValid()).is.true;
        let query = `
            mutation{
                changeDisbursement(disbursementId: 1, ${model.stringify()}){
                    recipient, notes, disbursementId
                }
            }
        `;
        return graphql(Schema, query)
        .then(res=>{
            let disbursement = res.data.changeDisbursement;
            expect(res.errors).to.be.undefined;
            expect(disbursement.recipient).equals(2);
            expect(disbursement.notes).equals('blah blah');
            
        });
    });
});