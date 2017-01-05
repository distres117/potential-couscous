export class TransactionSubmitModel{
    _actionList = ['New', 'Update (version)', 'Update (external)', 'Archive', 'Rename', 'Delete'];
    _typeList = [
            {label:'Feature Class', value:'featureClasses'},
            {label: 'Raster', value: 'rasters'},
            {label: 'Table', value: 'tables'}
        ];
    submitDate = Date.now();
    submitPerson = null;
    action = null;
    selectData = null;
    description = null;
    indexes = null;
}

export class TransactionReviewModel{
    _passedList = ['No', 'Yes'];
    reviewDate = Date.now();
    reviewer = null;
    reviewNotes = null;
    passed = false;

}

export class TransactionLoadModel{
    loadDate = Date.now();
    sdePerson = null;
    dataset = null;
}