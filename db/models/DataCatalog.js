/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let DataCatalog = sequelize.define('DataCatalog', {
		dataCatalogId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'DataCatalogID'
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
		}
	}, {
		timestamps:false,
		tableName: 'tblDataCatalog',
		classMethods:{
			associate: models=>{
				DataCatalog.hasMany(models.Transaction, {foreignKey:'DataCatalogID'});
				DataCatalog.hasMany(models.Disbursement, {foreignKey:'DataCatalogID'});
				DataCatalog.hasMany(models.Layer, {foreignKey:'DataCatalogID'});
				DataCatalog.hasOne(models.EnterpriseGDB, {foreignKey:'DataCatalogID'});
				DataCatalog.hasOne(models.Information, {foreignKey:'DataCatalogID'});

			}
		}
	});
	return DataCatalog;
};
