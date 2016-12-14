/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let EnterpriseGDB = sequelize.define('EnterpriseGDB', {
		dataCatalogId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'DataCatalogID'
		},
		server: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Server'
		},
		instance: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Instance'
		},
		location: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Location'
		},
		version: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Version'
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Description'
		}
	}, {
		tableName: 'tblEnterpriseGeodatabase',
		timestamps:false,
		classMethods:{
			associate:models=>{
				EnterpriseGDB.belongsTo(models.DataCatalog, {foreignKey:'DataCatalogID'});
				EnterpriseGDB.hasOne(models.Raster, {foreignKey:'DataCatalogID'});
				EnterpriseGDB.hasOne(models.Table, {foreignKey:'DataCatalogID'});
				EnterpriseGDB.hasOne(models.FeatureClass, {foreignKey:'DataCatalogID'});
			}
		}
	});
	return EnterpriseGDB;
};
