/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tblOrganizations', {
		organizationId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'OrganizationID'
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Name'
		},
		abbrev: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Abbrev'
		},
		orgTypeId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'OrgTypeID'
		}
	}, {
		tableName: 'tblOrganizations'
	});
};
