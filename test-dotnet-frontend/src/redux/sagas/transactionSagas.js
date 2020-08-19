import {takeLatest, call, put, select} from 'redux-saga/effects'
import {TransactionActionTypes} from "../actionTypes";
import {TransactionActionCreators} from "../actionCreators";
import {TransactionApi} from "../externalApi";
import {AppConstants} from "../../config/constants";

const getPageNumber = state => state.TransactionReducer.pageNumber;
const getFilters = state => ({
    transactionStatusesFilter: state.TransactionReducer.transactionStatusesFilter,
    transactionTypesFilter: state.TransactionReducer.transactionTypesFilter
});

function* getTransactionPageSaga() {
    const searchSettings = {
        pageNumber: yield select(getPageNumber),
        transactionFilters: yield select(getFilters)
    };
    try {
        const response = yield call(TransactionApi.getTransactionsPage, AppConstants.NUMBER_OF_ITEMS_PER_PAGE, searchSettings);
        yield put(TransactionActionCreators.getTransactionsPageSuccess(response.data));
    } catch (e) {
        yield put(TransactionActionCreators.getTransactionsPageFailure(e.message));
    }
}

export function* getTransactionPageWatcher() {
    yield takeLatest(TransactionActionTypes.GET_TRANSACTIONS_PAGE_REQUEST, getTransactionPageSaga);
}

function* getTransactionsCountSaga() {
    const filters = yield select(getFilters);
    try {
        const response = yield call(TransactionApi.getTransactionsCount, filters);
        yield put(TransactionActionCreators.getTransactionsCountSuccess(response.data));
    } catch (e) {
        yield put(TransactionActionCreators.getTransactionsCountFailure(e.message));
    }
}

export function* getTransactionsCountWatcher() {
    yield takeLatest(TransactionActionTypes.GET_TRANSACTIONS_COUNT_REQUEST, getTransactionsCountSaga);
}

function* addImportedTransactionsSaga(action) {
    const csv = action.csv;
    try {
        const response = yield call(TransactionApi.addImportedTransactions, csv);
        yield put(TransactionActionCreators.addImportedTransactionsSuccess(response.data));
    } catch (e) {
        yield put(TransactionActionCreators.addImportedTransactionsFailure(e.message))
    }
}

export function* addImportedTransactionsWatcher() {
    yield takeLatest(TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_REQUEST, addImportedTransactionsSaga);
}

function* getExportedTransactionsSaga() {
    const filters = yield select(getFilters);
    try {
        const response = yield call(TransactionApi.getExportedTransactions, filters);

        // TODO: refactor
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();

        yield put(TransactionActionCreators.getExportedTransactionsSuccess());
    } catch (e) {
        yield put(TransactionActionCreators.getExportedTransactionsFailure(e.message));
    }
}

export function* getExportedTransactionsWatcher() {
    yield takeLatest(TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_REQUEST, getExportedTransactionsSaga);
}

function* updateTransactionStatusSaga(action) {
    const newStatus = action.newStatus;
    const transactionId = action.transactionId;
    try {
        yield call(TransactionApi.updateTransactionStatus, transactionId, newStatus);
        yield put(TransactionActionCreators.updateTransactionStatusSuccess(transactionId, newStatus));
    } catch (e) {
        yield put(TransactionActionCreators.updateTransactionStatusFailure(e.message))
    }
}

export function* updateTransactionStatusWatcher() {
    yield takeLatest(TransactionActionTypes.UPDATE_TRANSACTION_STATUS_REQUEST, updateTransactionStatusSaga);
}

function* deleteTransactionSaga(action) {
    const transactionId = action.transactionId;
    try {
        yield call(TransactionApi.deleteTransaction, transactionId);
        yield put(TransactionActionCreators.deleteTransactionSuccess());
    } catch (e) {
        yield put(TransactionActionCreators.deleteTransactionFailure(e.message));
    }
}

export function* deleteTransactionWatcher() {
    yield takeLatest(TransactionActionTypes.DELETE_TRANSACTION_REQUEST, deleteTransactionSaga);
}
