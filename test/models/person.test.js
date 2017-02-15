import { expect } from 'chai';
import { graphql } from 'graphql';
import { Schema } from '../../db/schemas';
import { connect, models } from '../../db';
import Sequelize from 'sequelize';
import {PersonModel} from '../../app/client/models/person.models';
import * as _ from 'lodash';

describe.only('Person model tests', ()=>{
    before(()=>{
        return connect(true)
        .then(()=>{
            let mutation = `
                mutation{
                    newOrganization(
                        abbrev:"NYCEM"){
                            organizationId
                    }
                }`;
            return graphql(Schema,mutation);
        });
    });
    it('should create a person', ()=>{
        let model = new PersonModel();
        model.prePopulate(null,{
            firstName: 'Jim',
            lastName: 'testy',
            organizationId:'1',
            eMail:'test@testy.com'
        });
        let mutation = `
        mutation{
            newPerson(${model.stringify()}){
                personId, firstName,lastName, organizationId
            }
        }`;
        return graphql(Schema, mutation)
        .then(res=>{
            let person = res.data.newPerson;
            expect(person.personId).equals(1);
            expect(person.organizationId).equals(1);
            expect(person.firstName).equals('Jim');
            expect(model.isValid()).true;
        })
    });
    it('should update a person',()=>{
        let model = new PersonModel();
        model.prePopulate(null,{
            firstName: 'jake',
            lastName: 'testme',
            organizationId:'1',
            eMail:'test@testy.com'
        });
        let mutation = `
        mutation{
            changePerson(personId:1, ${model.stringify()}){
                personId, firstName,lastName, organizationId
            }
        }`;
        return graphql(Schema, mutation)
        .then(res=>{
            let person = res.data.changePerson;
            expect(person.personId).equals(1);
            expect(person.organizationId).equals(1);
            expect(person.firstName).equals('jake');
        })
    });
});