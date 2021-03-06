/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let DomainTransmittal = sequelize.define('DomainTransmittal', {
		transmittalId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'TransmittalID'
		},
		method: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Method'
		}
	}, {
		timestamps:false,
		tableName: 'tblDomainTransmittal',
		timestamps:false
	});
	return DomainTransmittal;
};
