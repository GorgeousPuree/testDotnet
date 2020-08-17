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
        yield call(TransactionApi.addImportedTransactions, csv);
        yield put(TransactionActionCreators.addImportedTransactionsSuccess());
    } catch (e) {
        console.log(e);
        yield put(TransactionActionCreators.addImportedTransactionsFailure(e.message))
    }
}

export function* addImportedTransactionsWatcher() {
    yield takeLatest(TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_REQUEST, addImportedTransactionsSaga);
}
