/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let Disbursement = sequelize.define('Disbursement', {
		disbursementId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'DisbursementID',
			autoIncrement: true
		},
		dataCatalogId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'DataCatalogID'
		},
		date: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'Date'
		},
		recipient: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Recipient'
		},
		contractor: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Contractor'
		},
		provider: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Provider'
		},
		formatId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'FormatID'
		},
		transmittalId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'TransmittalID'
		},
		selCriteria: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'SelCriteria'
		},
		notes: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Notes'
		}
	}, {
		tableName: 'tblDisbursements',
		timestamps:false,
		classMethods:{
			associate: models=>{
				Disbursement.belongsTo(models.DataCatalog, {foreignKey: 'DataCatalogID'});
				//Disbursement.hasOne(models.DomainFormat, {foreignKey: 'FormatID'});
				//Disbursement.hasOne(models.DomainTransmittal, {foreignKey: 'TransmittalID'});
			}
		}
	});
	return Disbursement;
};
