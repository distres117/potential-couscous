import {expect} from 'chai';
import client from '../../services/axios.service';
import {startTransactionsDatasetSearch} from '../../redux/actions/transaction.actions';
import types from '../../redux/actions/action.types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http';
import axios from 'axios';
import sinon,{stub} from 'sinon';

function configStub(returnData){ //stubbing the api instead of using nock -- easier
    sandbox.stub(client, 'post',()=>{
        return new Promise((res,rej)=>{
            return res(returnData);
        });
    });
}

const createStore = configureMockStore([thunk]);

let sandbox;
describe('db actions testing',()=>{
    describe('startTransactionDatasetSearch',function(){
        this.timeout(20000);
        let store;
        beforeEach(()=>{
            store = createStore({});
            sandbox = sinon.sandbox.create();
        });
        afterEach(()=>{
            sandbox.restore();
        });
        // it('should not find the requested dataset', ()=>{
        //     let returnData = {
        //         data:{
        //             data:{
        //                 transactions:[]
        //             }
        //         }
        //     }
        //     configStub(returnData);
        //     return store.dispatch(startTransactionsDatasetSearch('WONT_FIND_ME'))
        //     .then(()=>{
        //         //console.log(store.getActions());
        //         let action = store.getActions()[0];
        //         expect(action).to.be.ok;
        //         expect(action.type).to.equal(types.SEARCH_RESULT_DATASET);
        //         expect(action.payload.message).to.equal('Dataset not found');
        //     });
        // });
        it('should find the requested dataset in the catalog', ()=>{
            let returnData = {
                data:{
                    data:{
                        transactions:[
                                {lastUpdated: new Date('7/1/2016'), transactionId: 1, passed: 1},
                                {lastUpdated: new Date('6/1/2016'), transactionId: 2, recorded:0},
                                {lastUpdated: new Date('5/1/2016'), transactionId: 3, recorded:1},
                            ]
                        }
                }
            }
            configStub(returnData);
            return store.dispatch(startTransactionsDatasetSearch('YOU_FOUND_ME'))
            .then(()=>{
                let action = store.getActions()[1];
                expect(action).to.be.ok;
                expect(action.payload.message).to.equal('Match found with 2 open transactions');
                expect(action.payload.extra.transactionId).to.equal(1);
            });
        });
        it('should find the dataset in sde, NOT in the catalog', ()=>{
            let returnData = {
                data:{
                    data:{
                        transactions:[]
                    }
                }
            };
            configStub(returnData);
            return store.dispatch(startTransactionsDatasetSearch('sde.SDE.NYC_Buildings_composite'))
            .then(()=>{
                let action = store.getActions()[1];
                expect(action).to.be.ok;
                expect(action.payload.message).to.equal('Match found in sde');
            });
        })
    });
});