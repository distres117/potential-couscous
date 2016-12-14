/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tblErrors', {
		dataCatalogId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'DataCatalogID'
		},
		table: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Table'
		},
		procedure: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Procedure'
		},
		field: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Field'
		},
		errNum: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'ErrNum'
		},
		errMsg: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'ErrMsg'
		}
	}, {
		tableName: 'tblErrors'
	});
};
