import Sequelize from 'sequelize';
import config from './config';
import fs from 'fs';
import path from 'path';
import * as _ from 'lodash';

let db = {};
const modelsDir = __dirname + '/models';
const whiteList = ['DataCatalog', 'Transaction', 'Information', 'FeatureClass', 'Field']; //For dev purposes
let sequelize = new Sequelize(config.database, config.username, config.password, config.options);
fs.readdirSync(modelsDir)
    .forEach(file => {
        if (whiteList.includes(file.replace('.js',''))){
            let model = sequelize.import(path.join(modelsDir, file));
            db[model.name] = model;
        }
    });
Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName])
        db[modelName].associate(db);
});
export const connect = dev => {
    // function synchronize(){
    //     return sequelize.sync()
    //         .then(()=>{
    //             console.log('Models registered...');
    //         });
    // }
    // if (dev){
    //     let promises = Object.keys(_.omit(db, ['DataCatalog'])).map(k=>db[k].drop())
    //     return Promise.all(promises)
    //     .then(()=>{
    //         return db['DataCatalog'].drop();
    //     })
    //     .then(()=>synchronize());
    // }
    // return synchronize();
    
    return sequelize.sync({force: !!dev})
        .then(()=>{
            console.log('Models registered...');
        });
    
    
};
export const models = db;