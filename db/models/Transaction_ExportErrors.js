/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tblTransactionExportErrors', {
		error: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Error'
		},
		field: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Field'
		},
		row: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Row'
		}
	}, {
		tableName: 'tblTransaction_ExportErrors'
	});
};
