import { expect } from 'chai';
import { graphql } from 'graphql';
import { Schema } from '../../db/schemas';
import { connect, models } from '../../db';

xdescribe('disbursement tests', ()=>{
    before(()=>{
        //process.env.TEST= true; //switch to use actual data
        return connect();
    });
    it('should get 5 most recent disbursements', ()=>{
        let query = `
            query{
                disbursements(limit:5, order:"reverse:date"){
                    disbursementId
                }
            }
        `;
        return graphql(Schema, query)
        .then(res=>{
            expect(res.data.disbursements).lengthOf(5);
        });
    });

});