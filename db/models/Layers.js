/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let Layer = sequelize.define('Layer', {
		layerId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'LayerID'
		},
		layerName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'LayerName'
		},
		groupLayer: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
			field: 'GroupLayer'
		},
		path: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Path'
		},
		dataCatalogId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'DataCatalogID'
		},
		maximum: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Maximum'
		},
		minimum: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Minimum'
		},
		defQuery: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'DefQuery'
		},
		flag: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Flag'
		}
	}, {
		tableName: 'tblLayers',
		timestamps:false,
		classMethods:{
			associate:models=>{
				Layer.belongsTo(models.DataCatalog, {foreignKey:'DataCatalogID'});
			}
		}
	});
	return Layer;
};
