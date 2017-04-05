require('babel-register');
require('babel-polyfill');
const db = require('../../db');

db.connect(true)
    .then(()=>{
        //create catalog row
        return db.models.DataCatalog.create({name:'TestRow'});
    })
    .then(catalogRow=>{
        //create information row
        return db.models.Information.create({
            abstract: 'stupid test abstract',
            title:'this should change',
            purpose:'who knows',
            dataCatalogId: catalogRow.dataCatalogId,
            source: 'my butt',
            maintainedBy:'carrot top'
        })
    })
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
    .then(()=>{//create some domains
        return Promise.all([
            db.models.DomainFormat.create({formatId:1, type:'csv'}),
            db.models.DomainTransmittal.create({transmittalId:1, type:'email'})
        ]);
    })
    .then(()=>{
        return db.models.Disbursement.create({date:Date.now(), recipient:1, contractor: 1, provider: 2, formatId:1, transmittalId:1,selCriteria:'query', notes:'blah blah blah'});
    })
    .then(()=>{
        console.log('Db seeded successfully');
        process.exit(0);
    })
    .catch(e=>{
        console.log('Seeding failed: ', e);
    });

