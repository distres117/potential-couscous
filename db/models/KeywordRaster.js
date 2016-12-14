/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tblKeywordsRaster', {
		keywordId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'KeywordID'
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
		tableName: 'tblKeywordsRaster'
	});
};
