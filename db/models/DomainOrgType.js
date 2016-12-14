/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tblDomainOrgType', {
		orgTypeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'OrgTypeID'
		},
		type: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Type'
		}
	}, {
		tableName: 'tblDomainOrgType'
	});
};
