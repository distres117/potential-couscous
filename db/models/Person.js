/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tblPersons', {
		personId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'PersonID'
		},
		title: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Title'
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'First Name'
		},
		middleName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Middle Name'
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Last Name'
		},
		position: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Position'
		},
		organizationId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'OrganizationID'
		},
		division: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Division'
		},
		contractor: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Contractor'
		},
		address1: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Address1'
		},
		address2: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Address2'
		},
		city: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'City'
		},
		state: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'State'
		},
		zip: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'ZIP'
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Phone'
		},
		extension: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Extension'
		},
		eMail: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'E-mail'
		},
		notes: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Notes'
		}
	}, {
		tableName: 'tblPersons'
	});
};
