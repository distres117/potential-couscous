const SequelizeAuto = require('sequelize-auto'),
    config = require('./index');
//RUNNING THIS WILL OVERWRITE ALL MODELS!!!!
// const auto = new SequelizeAuto(config.database, config.username, config.password,{
//     host:config.options.host,
//     dialect: config.options.dialect,
//     directory: './db/models',
//     camelCase:true
// })

// auto.run(err=>{
//     console.log(err);
// });
// console.log(auto.tables);