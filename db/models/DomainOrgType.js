/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let OrgType = sequelize.define('OrgType', {
		orgTypeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'OrgTypeID',
			autoIncrement:true
		},
		type: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Type'
		}
	}, {
		tableName: 'tblDomainOrgType',
		timestamps: false
		// classMethods:{
		// 	associate: models =>{
		// 		OrgType.belongsTo(models.Organization, {foreignKey:'OrgTypeID'});
		// 	}
		// }
	});
	return OrgType;
};
