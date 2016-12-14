/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('switchboardItems', {
		switchboardId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'SwitchboardID'
		},
		itemNumber: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'ItemNumber'
		},
		itemText: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'ItemText'
		},
		command: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Command'
		},
		argument: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Argument'
		}
	}, {
		tableName: 'Switchboard Items'
	});
};
