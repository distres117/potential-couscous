/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let Table = sequelize.define('Table', {
		dataCatalogId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'DataCatalogID'
		},
		dataType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Data Type'
		},
		table: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Table'
		}
	}, {
		tableName: 'tblTables',
		timestamps:false,
		classMethods:{
			associate: models=>{
				Table.belongsTo(models.EnterpriseGdb, {foreignKey: 'DataCatalogID'})
			}
		}
	});
	return Table;
};
