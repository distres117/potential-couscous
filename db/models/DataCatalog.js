import * as _ from 'lodash';
/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let DataCatalog = sequelize.define('DataCatalog', {
		dataCatalogId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'DataCatalogID',
			autoIncrement:true
		},
		type: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Type'
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Name'
		},
		status: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Status'
		},
		updated:{
			type: DataTypes.VIRTUAL,
			get: async function(){
				let trans = await this.getTransactions();
				if (trans.length)
					return _.orderBy(trans, 'lastUpdated', 'desc')[0].lastUpdated;
				return null;
			}

		}
	}, {
		timestamps:false,
		tableName: 'tblDataCatalog',
		classMethods:{
			associate: models=>{
				DataCatalog.hasMany(models.Transaction, {foreignKey:'DataCatalogID'});
				DataCatalog.hasOne(models.FeatureClass, {foreignKey:'DataCatalogID'});
				DataCatalog.hasOne(models.Information, {foreignKey:'DataCatalogID'});
				DataCatalog.hasMany(models.Field, {foreignKey: 'DataCatalogID'});
				DataCatalog.hasOne(models.Information, {foreignKey:'DataCatalogID'});
				DataCatalog.hasMany(models.Keyword, {foreignKey:'DataCatalogID'});
				DataCatalog.hasMany(models.Disbursement, {foreignKey:'DataCatalogID'});
				DataCatalog.hasMany(models.Layer, {foreignKey:'DataCatalogID'});
				DataCatalog.hasOne(models.EnterpriseGdb, {foreignKey:'DataCatalogID'});
			}
		}
	});
	return DataCatalog;
};
