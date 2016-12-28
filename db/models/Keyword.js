/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const Keyword = sequelize.define('Keyword', {
		keywordId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'KeywordID',
			autoIncrement:true
		},
		dataCatalogId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'DataCatalogID'
		},
		theme: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Theme'
		},
		keyword: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Keyword'
		}
	}, {
		tableName: 'tblKeywords',
		timestamps:false,
		classMethods:{
			associate:models=>{
				Keyword.belongsTo(models.DataCatalog, {foreignKey: 'DataCatalogID'});
			}
		}
	});
	return Keyword;
};
