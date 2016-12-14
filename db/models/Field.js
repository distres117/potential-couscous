/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tblFields', {
		fieldId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'FieldID'
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
		}
	}, {
		tableName: 'tblFields'
	});
};
