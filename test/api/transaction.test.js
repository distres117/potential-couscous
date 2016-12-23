import {expect} from 'chai';
import {graphql} from 'graphql';
import {Schema} from '../../db/schemas';
import {connect} from '../../db';

describe('api tests', function(){
    this.timeout(60000);
    before(done=>{
        connect(true)
        .then(()=>{
            done();
        });
    });
    it('should create new transaction', done=>{
        let query = `
            mutation{
                newTransaction(datasetName:"NYC_Buildings_composite", datasetType: "feature"){
                    dataCatalogId
                    transactionId
                }
            }
        `;
        graphql(Schema, query)
        .then(res=>{
            let transaction = res.data.newTransaction;
            expect(transaction.transactionId).to.equal(1);
            done();
        });

    });
    
});
