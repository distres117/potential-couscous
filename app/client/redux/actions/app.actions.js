import types from './action.types';
import { TransactionReviewModel, TransactionSubmitModel, TransactionLoadModel } from '../../models/transaction.models';
import { toastr } from 'react-redux-toastr';
import authService from '../../services/authService';

export const setCurrentRecordAction = (row) => {
    //console.log('current: ', row);
    return {
        type: types.OVERWRITE_CURRENT_RECORD,
        payload: row
    }
}
export const overwriteCurrentRecordAction = row =>{
    return {
        type: types.OVERWRITE_CURRENT_RECORD,
        payload: row
    }
}
export const renderTransactionViewAction = (row) => {
    return (dispatch, getState) => {
        if (!row)
            dispatch(nullTransactionAction());
        else if (!row.passed && !row.recorded)
            dispatch(reviewTransactionAction());
        else if (row.passed && !row.recorded)
            dispatch(loadTransactionAction());
        else if (row.passed && row.recorded)
            dispatch(nullTransactionAction());
    }
}
export const clearCurrentRecordAction = () => {
    return {
        type: types.CLEAR_CURRENT_RECORD
    }
}
export const createTransactionAction = () => {
    return {
        type: types.CREATE_TRANSACTION,
        payload: new TransactionSubmitModel()
    };
}
export const reviewTransactionAction = () => {
    return (dispatch, getState) => {
        let model = new TransactionReviewModel();
        let current = getState().current;
        model.prePopulate(null, current);
        //dispatch(nullTransactionAction())
        dispatch({
            type: types.REVIEW_TRANSACTION,
            payload: model
        });
    }
}
export const setPeopleAction = (people) => {
    return {
        type: types.SET_PEOPLE,
        payload: people
    }
}
export const commitTableData = models => {
    return {
        type: types.COMMIT_TABLE_DATA,
        payload: model
    };
}
export const loadTransactionAction = () => {
    return (dispatch, getState) => {
        let model = new TransactionLoadModel();
        let current = getState().current;
        model.prePopulate(null,current);
        dispatch({
            type: types.LOAD_TRANSACTION,
            payload: model
        });
    }
}
export const nullTransactionAction = () => {
    return {
        type: types.NULL_TRANSACTION
    }
}
export const setVersions = versions => {
    return {
        type: types.SET_VERSIONS,
        payload: versions
    }
}
export const clearVersions = () => {

}
export const startLongProcess = () => {
    return {
        type: types.START_LONG_PROCESS
    }
}
export const endLongProcess = () => {
    return {
        type: types.END_LONG_PROCESS
    }
}
export const getAppUserAction = people => {
    return (dispatch, getState) => {
        let user = authService();
        if (!user) {
            toastr.info('We could not identify you', 'check console for details');
        } else {
            let appUser = _.find(people, { userName: user });
            if (appUser)
                toastr.success(`Welcome, ${appUser.firstName}!`);
            else
                toast.info('Could not find you in the user list');
            dispatch({
                type: types.SET_APP_USER,
                payload: appUser.personId
            });
        }

    }

}