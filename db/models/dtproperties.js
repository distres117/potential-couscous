/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('dtproperties', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		objectid: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'objectid'
		},
		property: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			field: 'property'
		},
		value: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'value'
		},
		uvalue: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'uvalue'
		},
		lvalue: {
			type: "IMAGE",
			allowNull: true,
			field: 'lvalue'
		},
		version: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: "((0))",
			field: 'version'
		}
	}, {
		tableName: 'dtproperties'
	});
};
