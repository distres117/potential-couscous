/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let Information = sequelize.define('Information', {
		dataCatalogId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'DataCatalogID'
		},
		title: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Title'
		},
		abstract: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Abstract'
		},
		purpose: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Purpose'
		},
		source: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Source'
		},
		maintainedBy: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'MaintainedBy'
		},
		date: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Date'
		},
		updateCycle: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'UpdateCycle'
		},
		distribution: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Distribution'
		},
		contact: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Contact'
		},
		documentation: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Documentation'
		},
		notes: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Notes'
		},
		webService: {
			type: "BIT",
			allowNull: true,
			defaultValue: "((0))",
			field: 'WebService'
		},
		template: {
			type: "BIT",
			allowNull: true,
			defaultValue: "((0))",
			field: 'Template'
		},
		internal: {
			type: "BIT",
			allowNull: true,
			defaultValue: "((0))",
			field: 'Internal'
		},
		category1: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Category1'
		},
		category2: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Category2'
		},
		category3: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Category3'
		},
		scale: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Scale'
		},
		layerStatus: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'LayerStatus'
		}
	}, {
		tableName: 'tblInformation',
		timestamps:false,
		classMethods:{
			associate: models=>{
				Information.belongsTo(models.DataCatalog, {foreignKey:'DataCatalogID'});
			}
		}
	});
	return Information;
};
