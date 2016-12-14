/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tblDomainLayerStatus', {
		layerStatusId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'LayerStatusID'
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Description'
		}
	}, {
		tableName: 'tblDomainLayerStatus'
	});
};
