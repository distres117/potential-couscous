import { expect } from 'chai';
import { graphql } from 'graphql';
import { Schema } from '../../db/schemas';
import { connect, models } from '../../db';
import Sequelize from 'sequelize';
import {TransactionSubmitModel} from '../../app/client/models/transaction.models';
import * as _ from 'lodash';
import fs from 'fs';

describe('api tests', function () { //for new dataset, must have run util tests at least once (to export the metadata)
    let transaction;
    const datasetName = '_OMtesting_feature';
    const loadDataset = `sde.SDE.${datasetName}`;
    const archiveName = `archive.SDE.${datasetName}`;
    const renamed = '_omtesting_';
    const loadRenamed = `sde.SDE.${renamed}`;
    const archiveRenamed = `archive.SDE.${renamed}`; 
    this.timeout(60000);
    before(()=> {
        //delete generated xml first...
        let fileName = `\\\\vnxfileserver\\GIS_FILES\\SDE_IMPORT\\READY_TO_LOAD\\metadata_export\\_OMtesting_feature.xml`;
        if (fs.existsSync(fileName)) 
            fs.unlinkSync(fileName);
        return connect(true)
    });
    it('should create new transaction', () => {
        let query = `
            mutation{
                newTransaction(
                    submitName:"${datasetName}", 
                    dataType: "1",
                    submitPerson:2,
                    action:"New",
                    submitGdb: "I:\\\\SDE_IMPORT\\\\READY_TO_LOAD\\\\Data_to_import.gdb"){
                        transactionId
                        submitName
                }
            }
        `;
        return graphql(Schema, query)
            .then(async res => {
                if (res.errors) {
                    console.log(res.errors);
                }
                transaction = res.data.newTransaction;
                let catalogRow = await models.DataCatalog.count();
                expect(transaction.transactionId).to.equal(1);
                expect(transaction.submitName).to.equal(datasetName);
                expect(catalogRow).to.equal(0);
            });

    });
    it('should record transaction', () => {
        let query = `
                mutation{
                    recordTransaction(transactionId: ${transaction.transactionId}){
                        dataCatalogId
                        transactionId
                    }
                }`;
        return graphql(Schema, query)
            .then(async res => {
                let information = await models.Information.count();
                let gdb = await models.EnterpriseGdb.count();
                let featureClass = await models.FeatureClass.count();
                let field = await models.Field.count();
                expect(information).to.equal(1);
                expect(gdb).to.equal(1);
                expect(featureClass).to.equal(1);
                expect(field).to.be.greaterThan(1);
            });
    });
    it('should populate return object correctly', () => {
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
                    keywords{
                        dataCatalogId
                    }
                }
            }
        `;
        return graphql(Schema, query)
            .then(res => {
                let row = res.data.catalogRows[0];
                expect(row.transactions.length).to.equal(1);
                expect(row.featureClasses).to.be.ok;
                expect(row.gdb).to.be.ok;
                expect(row.info).to.be.ok;
                expect(row.fields.length).to.be.greaterThan(1);
                expect(row.keywords.length).to.be.greaterThan(1);
            });
    });
    it('should alter transaction', () => {
        let query = `
                mutation{
                    changeTransaction(transactionId:1, sdePerson: 2){
                        sdePerson
                    }
                }
            `;
        return graphql(Schema, query)
            .then(res => {
                expect(res.data.changeTransaction.sdePerson).to.equal(2);
                
            })
            .catch(err=>{
                throw new Error(err);
            });
    });
    it('should create a versioned update transaction', () => {
        let query = `
            mutation{
                newTransaction(
                    action:"Update (version)", 
                    submitVersion:"test", 
                    submitName:"${loadDataset}",
                    submitGdb: "voemsql1")
                    {
                        action
                        submitGdb
                        submitVersion
                }
            }
        `;
        return graphql(Schema, query)
            .then(async res => {
                let transactions = await models.Transaction.count();
                expect(transactions).to.equal(2);
            });
    });
    it('should not create new catalogRow if row exists', () => {
        let query = `
            mutation{
                recordTransaction(transactionId: 2){
                    transactionId
                }
            }
        `;
        return graphql(Schema, query)
            .then(async res => {
                let count = await models.DataCatalog.count();
                expect(count).to.equal(1);
            });
    });
    it('should create an archive transaction', () => {
        let query = `
            mutation{
                newTransaction(
                    action:"Archive", 
                    submitVersion:"test", 
                    submitName:"${loadDataset}",
                    submitGdb: "voemsql1")
                    {
                        action
                        submitGdb
                        submitVersion
                }
            }
        `;
        return graphql(Schema, query)
            .then(res => {
                let query = `
            mutation{
                recordTransaction(transactionId: 3){
                    transactionId
                    recorded
                    }
                }
            `;
            return graphql(Schema, query);
            })
            .then(async res => {
                if (res.errors) {
                    console.log(res.errors);
                    
                }
                let catalogRow = await models.DataCatalog.findOne();
                expect(res.data.recordTransaction.recorded).to.equal(1);
                expect(catalogRow.status).to.equal('Archived');
                expect(catalogRow.name).to.equal(archiveName);
            });
    });
    it('should create delete transaction', () => {
        let query = `
            mutation{
                newTransaction(
                    action:"Delete", 
                    submitVersion:"test", 
                    submitName:"${archiveName}",
                    submitGdb: "voemsql1")
                    {
                        action
                        submitGdb
                        submitVersion
                }
            }
        `;
        return graphql(Schema, query)
            .then(res => {
            let query = `
            mutation{
                recordTransaction(
                    transactionId: 4){
                        transactionId
                        recorded
                        loadName
                    }
                }
            `;
                return graphql(Schema, query);
            })
            .then(async res => {
                if (res.errors) {
                    console.log(res.errors);
                }
                let catalogRow = await models.DataCatalog.findOne();
                expect(res.data.recordTransaction.recorded).to.equal(1);
                expect(res.data.recordTransaction.loadName).to.equal(archiveName);
                expect(catalogRow.status).to.equal('Retired');
            });
    });
    it('should create rename transaction', ()=>{
        //for renaming, 'loadName' value MUST be provided
        let query = `
            mutation{
                newTransaction(
                    action:"Rename",  
                    submitName:"${archiveName}",
                    submitGdb: "voemsql1")
                    {
                        action
                        submitGdb
                        submitVersion
                }
            }
        `;
        return graphql(Schema, query)
            .then(res => {
            let query = `
            mutation{
                recordTransaction(
                    transactionId: 5,
                    loadName:"${archiveRenamed}"){
                        transactionId
                        recorded
                        loadName
                    }
                }
            `;
            return graphql(Schema, query);
            })
            .then(async res => {
                if (res.errors) {
                    console.log(res.errors);
                }
                let catalogRow = await models.DataCatalog.findOne();
                expect(res.data.recordTransaction.recorded).to.equal(1);
                expect(res.data.recordTransaction.loadName).to.equal(archiveRenamed);
                expect(catalogRow.status).to.equal('Retired');
                expect(catalogRow.name).to.equal(archiveRenamed);
            });
    });
    it('should create external update transaction', ()=>{
        let query = `
            mutation{
                newTransaction(
                    action:"Update (external)",  
                    submitName:"${renamed}",
                    submitGdb: "I:\\\\SDE_IMPORT\\\\READY_TO_LOAD\\\\Data_to_import.gdb")
                    {
                        action
                        submitGdb
                        submitVersion
                }
            }
        `;
        return graphql(Schema, query)
            .then(res => {
            let query = `
            mutation{
                recordTransaction(
                    transactionId: 6){
                        transactionId
                        recorded
                        loadName
                    }
                }
            `;
                return graphql(Schema, query);
            })
            .then(async res => {
                if (res.errors) {
                    console.log(res.errors);
                }
                let catalogRow = await models.DataCatalog.findOne();
                expect(res.data.recordTransaction.recorded).to.equal(1);
                expect(res.data.recordTransaction.loadName).to.equal(loadRenamed);
                expect(catalogRow.status).to.equal('Production');
                expect(catalogRow.name).to.equal(loadRenamed);
            });
    });
});
