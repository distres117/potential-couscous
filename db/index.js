import Sequelize from 'sequelize';
import config from './config';
import fs from 'fs';
import path from 'path';
import * as _ from 'lodash';
import chalk from 'chalk';

let db = {};
const modelsDir = __dirname + '/models';
const whiteList = [ //name matches file not model name
    'DataCatalog', 
    'Transaction', 
    'Information', 'FeatureClass', 
    'Field', 
    'EnterpriseGeodatabase', 
    'Keyword', 
    'Person',
    'Organization',
    'Disbursement',
    'Layers'
]; //For dev purposes
let sequelize = new Sequelize(config.database, config.username, config.password, config.options);
fs.readdirSync(modelsDir)
    .forEach(file => {
        if (whiteList.includes(file.replace('.js',''))){
            let model = sequelize.import(path.join(modelsDir, file));
            db[model.name] = model;
        }
    });
Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]){
        //console.log(modelName);
        db[modelName].associate(db);
    }
});
export const connect = dev => {
    return sequelize.sync({force: !!dev})
        .then(()=>{
            console.log(chalk.blue('DB CONNECTED...'));
        })
        .catch(err=>{
            console.log(err);
        })
    
    
};
db.sequelize = sequelize;
export const models = db;