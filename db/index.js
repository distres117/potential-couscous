import Sequelize from 'sequelize';
import config from './config';
import fs from 'fs';
import path from 'path';

let db = {};
const modelsDir = __dirname + '/models';
let sequelize = new Sequelize(config.database, config.username, config.password, config.options);
fs.readdirSync(modelsDir)
    .forEach(file=>{
    let model = sequelize.import(path.join(modelsDir,file));
    db[model.name] = model;
});
Object.keys(db).forEach(modelName=>{
    if ('associate' in db[modelName])
        db[modelName].associate(db);
});
export const connect = dev=>sequelize.sync();
export const models = db;