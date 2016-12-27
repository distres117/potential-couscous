/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const EnterpriseGdb = sequelize.define('EnterpriseGdb', {
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
				EnterpriseGdb.belongsTo(models.DataCatalog, {foreignKey:'DataCatalogID'});
			}
		}
	});
	return EnterpriseGdb;
};
