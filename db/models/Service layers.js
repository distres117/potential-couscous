/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('serviceLayers', {
		f1: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'F1'
		}
	}, {
		tableName: 'Service layers'
	});
};
