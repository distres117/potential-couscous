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
    it('should record transaction', done => {
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
    it('should populate return object correctly', done=>{
        let query = `
            query{
                catalogRows(dataCatalogId:1){
                    transactions{
                        transactionId
                    }
                    featureClasses{
                        dataCatalogId
                    }
                    gdb{
                        dataCatalogId
                    }
                    info{
                        dataCatalogId
                    }
                    fields{
                        dataCatalogId
                    }
                }
            }
        `;
        graphql(Schema,query)
        .then(res=>{
            let row = res.data.catalogRows[0];
            expect(row.transactions.length).to.equal(1);
            expect(row.featureClasses).to.be.ok;
            expect(row.gdb).to.be.ok;
            expect(row.info).to.be.ok;
            expect(row.fields.length).to.be.greaterThan(1);
            done();
        })
    });
    it('should alter transaction', done=>{
        let query = `
                mutation{
                    changeTransaction(transactionId:1, sdePerson: 2){
                        sdePerson
                    }
                }
            `;
            graphql(Schema, query)
            .then(res=>{
                expect(res.data.changeTransaction.sdePerson).to.equal(2);
                done();
            });
    });
    it('should create a versioned update transaction', done=>{
        let query = `
            mutation{
                updateTransaction(updateType:"version", submitVersion:"test"){
                    action
                    submitGdb
                    submitVersion
                }
            }
        `;
        graphql(Schema,query)
        .then(async res=>{
            let transactions = await models.Transaction.count();
            expect(transactions).to.equal(2);
            done();
        });
    });
    it('should not create new catalogRow if row exists', done=>{
        let query = `
            mutation{
                recordTransaction(transactionId: 2){
                    transactionId
                }
            }
        `;
        graphql(Schema, query)
        .then(async res=>{
            let count = await models.DataCatalog.count();
            expect(count).to.equal(1);
            done();
        });
    });
});
