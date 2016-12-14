/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tblDomainCategories', {
		categoryId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'CategoryID'
		},
		primary: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Primary'
		},
		secondary: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Secondary'
		},
		tertiary: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Tertiary'
		}
	}, {
		tableName: 'tblDomainCategories'
	});
};
