import { expect } from 'chai';
import { graphql } from 'graphql';
import { Schema } from '../../db/schemas';
import { connect, models } from '../../db';

describe('People api tests', ()=>{
    let orgId;
    before(()=>{
        return connect(true);
    });
    it('should create a new organization', ()=>{
        let mutation = `
            mutation{
                newOrganization(
                    abbrev:"NYCEM"){
                        organizationId
                }
            }
            `;
            return graphql(Schema,mutation)
            .then(res=>{
                if (res.errors)
                    console.log(res.errors[0].message);
                expect(res.data.newOrganization.organizationId).equals(1);
            });
    });
    it('should create a new person who belongs to NYCEM', ()=>{
        let mutation = `
        mutation{
            newPerson(
                organizationId: 1, 
                firstName:"Person",
                lastName: "Test"){
                    personId
                }         
        }`;
        return graphql(Schema, mutation)
        .then(res=>{
            if (res.errors)
                throw new Error(res.errors);
            expect(res.data.newPerson.personId).equals(1);
        },err=>{
            console.log(err);
        });
    });
});