import { expect } from 'chai';
import { graphql } from 'graphql';
import { Schema } from '../../db/schemas';
import { connect, models } from '../../db';
import Sequelize from 'sequelize';
import {OrganizationModel} from '../../app/client/models/organization';
import * as _ from 'lodash';

describe('Organization model and api tests', ()=>{
    before(()=>{
        return connect(true)
        .then(async ()=>{
            await models.OrgType.create({type: 'test org type', orgTypeId:1});
            return models.OrgType.create({type: 'second test org type', orgTypeId:2});
        });
    });
    it('should create a new organization', ()=>{
        let model = new OrganizationModel();
        model.prePopulate(null, {
            name:'test org',
            abbrev:'TOTOT',
            orgTypeId:'1'
        });
        expect(model.isValid()).true;
        let query = `
                mutation{
                    newOrganization(${model.stringify()}){
                        organizationId
                    }
                }
            `;
        return graphql(Schema,query)
        .then(res=>{
            //console.log(res.errors);
            expect(res.errors).to.be.undefined;
            expect(res.data.newOrganization.organizationId).equals(1);
        });
    });
    it('should update the organization', ()=>{
        let model = new OrganizationModel();
        model.prePopulate(null, {
            name:'test org2',
            abbrev:'TOTOT',
            orgTypeId:'2'
        });
        let query = `
            mutation{
                changeOrganization(organizationId:1, ${model.stringify()}){
                    orgTypeId, name
                }
            }
        `;
        return graphql(Schema, query)
        .then(res=>{
            expect(res.errors).undefined;
            expect(res.data.changeOrganization.orgTypeId).equals(2);
            expect(res.data.changeOrganization.name).equals('test org2');

        });
    });
});