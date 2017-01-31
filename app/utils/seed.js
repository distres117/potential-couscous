require('babel-register');
require('babel-polyfill');
const db = require('../../db');

db.connect(true)
    .then(()=>{
        return db.models.Organization.create({abbrev:'NYCEM'});
    })
    .then(org=>{
        return Promise.all([
            db.models.Person.create({organizationId: org.organizationId, firstName:"Person", lastName: "Test"}),
            db.models.Person.create({organizationId:org.organizationId, firstName:'Oliver', lastName: 'McRobbie' })
        ]);
    })
    .then(()=>{
        console.log('Db seeded successfully');
        process.exit(0);
    })
    .catch(e=>{
        console.log('Seeding failed: ', e);
    });

