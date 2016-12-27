/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let Raster = sequelize.define('Raster', {
		dataCatalogId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'DataCatalogID'
		},
		dataType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Data Type'
		},
		raster: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Raster'
		},
		compression: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Compression'
		},
		compressionQuality: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Compression Quality'
		},
		tileWidth: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Tile Width'
		},
		tileHeight: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Tile Height'
		}
	}, {
		timestamps:false,
		tableName: 'tblRasters',
		classMethods:{
			associate:models=>{
				Raster.belongsTo(models.EnterpriseGdb, {foreignKey: 'DataCatalogID'});
			}
		}
	});
	return Raster;
};
