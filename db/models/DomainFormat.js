/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let DomainFormat = sequelize.define('DomainFormat', {
		formatId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'FormatID'
		},
		type: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Type'
		}
	}, {
		tableName: 'tblDomainFormat',
		timestamps:false
	});
	return DomainFormat;
};
