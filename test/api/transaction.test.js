import { expect } from 'chai';
import { graphql } from 'graphql';
import { Schema } from '../../db/schemas';
import { connect, models } from '../../db';
import Sequelize from 'sequelize';

describe('api tests', function () {
    let transaction;
    this.timeout(60000);
    before(done => {
        connect(true)
            .then(() => {
                done();
            });
    });
    it('should create new transaction', done => {
        let query = `
            mutation{
                newTransaction(datasetName:"NYC_Buildings_composite", datasetType: "feature"){
                    dataCatalogId
                    transactionId
                }
            }
        `;
        graphql(Schema, query)
            .then(res => {
                transaction = res.data.newTransaction;
                expect(transaction.transactionId).to.equal(1);
                done();
            });

    });
    it('should record transaction',  done => {
        let query = `
                mutation{
                    recordTransaction(transactionId: ${transaction.transactionId}){
                        dataCatalogId
                        transactionId
                    }
                }`;
        graphql(Schema, query)
            .then(async res => {
                let information = await models.Information.count();
                let gdb = await models.EnterpriseGdb.count();
                let featureClass = await models.FeatureClass.count();
                let field = await models.Field.count();
                expect(information).to.equal(1);
                expect(gdb).to.equal(1);
                expect(featureClass).to.equal(1);
                expect(field).to.be.greaterThan(1);
                done(); 
            });
        });
});
