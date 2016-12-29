import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import transactionType from '../../types/transactionType';
import { models } from '../../../../db';
import { attributeFields } from 'graphql-sequelize';
import { getDetails, getDetailsGp } from '../../../../app/services/acpyService';
import { dataType, dataTypeString, errorRes, dataTypeSimple, actionToStatus } from '../../../../app/utils/translators';
import chalk from 'chalk';
import * as _ from 'lodash';

export default async (source,args)=>{
    let transaction = await models.Transaction.findById(args.transactionId);
    if (!transaction)
        return errorRes('transaction not found');
    //create common values
    let loadName = args.loadName || transaction.submitName;
    if (loadName.indexOf('SDE')===-1)
        loadName = `sde.SDE.${loadName}`; 
    if (transaction.action==='Archive')
        loadName = loadName.replace(/^\w*/i, 'archive');
    let type = dataTypeString(transaction.dataType);
    //update transaction row to reflect change
    transaction.loadName = loadName;
    transaction.loadDate = Date.now();
    transaction.recorded = 1;
    //check if catalogRow already exists
    //console.log(chalk.red(transaction.submitName));
    let existingRow = await models.DataCatalog.findOne({where:{
        name: {
            $like: '%' + transaction.submitName
        }
    }});
    if (existingRow){
        //Update catalog row with new status or name
        transaction.dataCatalogId = existingRow.dataCatalogId;
        existingRow.name = loadName;
        if (transaction.action !== 'Rename')
            existingRow.status = actionToStatus(transaction.action);
        await existingRow.save();
        return transaction.save();
    }
    //If this is a new entry in catalog
    let {data} = await getDetailsGp(transaction.submitName, transaction.dataType);
    let metadata = data.results[0].value.metadata ? data.results[0].value.metadata.metadata : null;
    
    //create new DataCatalog row
    console.log(chalk.blue('Catalog row..'));
    let catalogRow = await models.DataCatalog.create({
        status: 'Production',
        name: loadName,
        type
    });
    //create feature class/raster/table row
    console.log(chalk.blue('feature/raster/table row..', transaction.dataType));
    let datasetRow;
    try {
        if (transaction.dataType === '1') {
            let datasetRow = await models.FeatureClass.create({
                dataCatalogId: catalogRow.dataCatalogId,
                dataType: type,
                featureClass: loadName,
                featureType: data.results[0].value.featureType,
                geometryType: data.results[0].value.shapeType
            });
        } //TODO: Conditions for other dataset types
    } catch (e) {
        console.log(chalk.red(e));
    }

    //create fields data rows
    console.log(chalk.blue('field rows..'));
    let fieldPromises = data.results[0].value.fields.map(field => {
        return models.Field.create({
            dataCatalogId: catalogRow.dataCatalogId,
            alias: field.alias,
            domain: field.domain,
            type: field.type,
            field: field.name
        });
    });
    try {
        await Promise.all(fieldPromises);
    } catch (e) {
        console.log(chalk.red(e))
    }

    //create information row
    let infoRow = models.Information.build({
        dataCatalogId: catalogRow.dataCatalogId,
        title: loadName
    });
    if (metadata) {
        try {
            console.log(chalk.blue('info row..'));
            let infoRow = _.assign(infoRow, {
                abstract: metadata.idinfo.descript.abstract,
                purpose: metadata.idinfo.descript.purpose,
                date: metadata.idinfo.citation.pubdate,
                updateCycle: metadata.idinfo.status.update
            });
        } catch (e) {
            console.log(chalk.red(e));
        } finally {
            await infoRow.save();
        }

        //create EnterpriseGdb row
        console.log(chalk.blue('Enterprise gdb row'));
        try {
            let gdbRow = await models.EnterpriseGdb.create({
                dataCatalogId: catalogRow.dataCatalogId,
                server: 'voemsql1',
                instance: 'sde:sqlserver:voemsql1\sde',
                location: 'sde',
                version: 'sde.DEFAULT',
                description: 'Instance default version'
            });
        } catch (e) {
            console.log(chalk.red(e));
        }

        //update transaction row to reflect change
        console.log(chalk.blue('Updating transaction...'));
        transaction.dataCatalogId = catalogRow.dataCatalogId;
        transaction.loadName = loadName;
        return transaction.save();
    }

}