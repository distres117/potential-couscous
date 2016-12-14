/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tblDomainScale', {
		scaleId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'ScaleID'
		},
		scale: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Scale'
		}
	}, {
		tableName: 'tblDomainScale'
	});
};
