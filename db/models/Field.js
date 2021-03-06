/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const Field = sequelize.define('Field', {
		fieldId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'FieldID',
			autoIncrement:true
		},
		dataCatalogId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'DataCatalogID'
		},
		field: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Field'
		},
		alias: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Alias'
		},
		type: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Type'
		},
		length: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Length'
		},
		precision: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Precision'
		},
		scale: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Scale'
		},
		definition: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Definition'
		},
		source: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Source'
		},
		domain:{
			type: DataTypes.STRING,
			allowNull:true,
			field: 'Domain'
		}
	}, {
		tableName: 'tblFields',
		timestamps:false,
		classMethods:{
			associate: (models)=>{
				Field.belongsTo(models.DataCatalog, {foreignKey: 'DataCatalogID'})
			}
		}
		
	});
	return Field;
};
