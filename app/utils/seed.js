require('babel-register');
require('babel-polyfill');
const db = require('../../db');

db.connect(true)
    .then(()=>{
        return Promise.all([
            db.models.Organization.create({abbrev:'NYCEM', name:'NYCEM'}),
            db.models.Organization.create({abbrev:'TESTORG', name:'TESTORG'})
        ])
        
    })
    .then(orgs=>{
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

