/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let Transaction = sequelize.define('Transaction', {
		transactionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'TransactionID',
			autoIncrement:true
		},
		dataCatalogId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'DataCatalogID'
		},
		submitDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'Submit Date'
		},
		submitPerson: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Submit Person'
			// set: function(value){
			// 	this.setDataValue('submitPerson',parseInt(value));
			// }
		},
		action: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Action'
		},
		submitGdb: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Submit GDB'
		},
		submitVersion: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Submit Version'
		},
		submitName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Submit Name'
		},
		dataType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Data Type'
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Description'
		},
		indexes: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Indexes'
		},
		reviewDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'Review Date'
		},
		reviewPerson: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Review Person'
		},
		reviewNotes: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Review Notes'
		},
		passed: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
			field: 'Passed'
		},
		sdePerson: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'SDE Person'
		},
		loadDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'Load Date'
		},
		loadName: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Load Name'
		},
		recorded: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
			field: 'Recorded'
		},
		dataTypeString:{
			type: DataTypes.VIRTUAL,
			get: function() {
				let types = {
					1: 'Feature class',
					2: 'Raster',
					3: 'Table'
				};
				return types[this.dataType]
			}
		},
		lastUpdated:{
			type: DataTypes.VIRTUAL,
			get: function(){
				return new Date(Math.max(this.submitDate, this.loadDate, this.reviewDate));
			}
		}
	}, {
		tableName: 'tblTransaction',
		timestamps:false,
		classMethods:{
			associate:models=>{
				Transaction.belongsTo(models.DataCatalog, {foreignKey: 'DataCatalogID'});
			}
		}
	});
	return Transaction;
};
