/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let State = sequelize.define('State', {
		stateId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'StateID'
		},
		state: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'State'
		},
		abbreviation: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Abbreviation'
		}
	}, {
		tableName: 'tblStates',
		timestamps:false
	});
	return State;
};
