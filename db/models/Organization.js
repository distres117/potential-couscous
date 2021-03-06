/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let Organization = sequelize.define('Organization', {
		organizationId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'OrganizationID',
			autoIncrement:true
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
		tableName: 'tblOrganizations',
		timestamps:false,
		classMethods:{
			associate: models=>{
				Organization.hasMany(models.Person, {foreignKey: 'OrganizationID'});
			}
		}
	});
	return Organization;
};
