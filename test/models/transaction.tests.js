import { expect } from 'chai';
import { graphql } from 'graphql';
import { Schema } from '../../db/schemas';
import { connect, models } from '../../db';
import Sequelize from 'sequelize';
import {TransactionSubmitModel, TransactionLoadModel, TransactionReviewModel} from '../../app/client/models/transaction.models';
import * as _ from 'lodash';


describe('model tests',function(){
    this.timeout(30000);
    before(()=>{
        return connect(true);
    })
    it('should create new transaction using model', ()=>{
        let model = new TransactionSubmitModel();
        model.prePopulate(null, {
            submitPerson: '1',
            action: 'New',
            submitName:'_OMtesting_feature',
            dataType:'featureClasses'
        });
        let query = `
            mutation{
                newTransaction(${model.stringify()}){
                        transactionId
                }
            }
        `;
        return graphql(Schema, query)
        .then(res=>{
            expect(model.isValid()).true;
            expect(res.data.newTransaction.transactionId).to.equal(1);
        });  
    });
    it('should update transaction using model', ()=>{
        let model = new TransactionReviewModel();
        model.prePopulate(null,{
            reviewPerson:'1',
            reviewNotes: 'blah blah blah',
            passed: '1'
        });
        let query = `
                mutation{
                    changeTransaction(transactionId: 1, ${model.stringify()}){
                        transactionId, passed
                    }
                }
            `;
        return graphql(Schema, query)
        .then(res=>{
            expect(model.isValid()).true;
            expect(res.data.changeTransaction.passed).equals(1);
        });
    });
    it('should record transaction using model', ()=>{
        let model = new TransactionLoadModel();
        model.prePopulate(null,{
            sdePerson:'1',
            submitName:'_OMtesting_feature'
        });
        let query = `
            mutation{
                recordTransaction(transactionId: 1, ${model.stringify()}){
                    transactionId, recorded
                }
            }
        `;
        return graphql(Schema,query)
        .then(res=>{
            expect(model.isValid()).true;
            expect(res.data.recordTransaction.recorded).to.equal(1);
        });
    });
})