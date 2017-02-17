require('babel-register');
require('babel-polyfill');
const db = require('../../db');

db.connect(true)
    .then(()=>{ //create org types
        return Promise.all([
            db.models.OrgType.create({type:'Pubic safety'}),
            db.models.OrgType.create({type:'Some kind of org type'})
        ]);
    })
    .then(orgTypes=>{ //create orgs
        return Promise.all([
            db.models.Organization.create({abbrev:'NYCEM', name:'NYCEM', orgTypeId: orgTypes[0].orgTypeId}),
            db.models.Organization.create({abbrev:'TESTORG', name:'TESTORG', orgTypeId: orgTypes[1].orgTypeId})
        ]);   
    })
    .then(orgs=>{ //create people
        return Promise.all([
            db.models.Person.create({organizationId: orgs[0].organizationId, firstName:"Person", lastName: "Test"}),
            db.models.Person.create({organizationId:orgs[1].organizationId, firstName:'Oliver', lastName: 'McRobbie' })
        ]);
    })
    .then(()=>{
        console.log('Db seeded successfully');
        process.exit(0);
    })
    .catch(e=>{
        console.log('Seeding failed: ', e);
    });

