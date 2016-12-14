/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let FeatureClass = sequelize.define('FeatureClass', {
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
		featureDataset: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Feature Dataset'
		},
		featureClass: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Feature Class'
		},
		featureType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Feature Type'
		},
		geometryType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Geometry Type'
		}
	}, {
		timestamps:false,
		tableName: 'tblFeatureClasses',
		classMethods:{
			associate:models=>{
				FeatureClass.belongsTo(models.EnterpriseGDB, {foreignKey:'DataCatalogID'});
			}
		}
	});
	return FeatureClass;
};
