import {expect} from 'chai';
import {connect,models} from '../db';


xdescribe('db tests', ()=>{
    before((done)=>{
        connect().then(()=>done());
    })
    it('should return some data', (done)=>{
        models.DataCatalog.findOne({include:[models.Transaction]})
        .then(instance=>{
            console.log(instance.Transactions.length);
            done();
        });
    });
});