import {takeLatest, call, put} from 'redux-saga/effects'
import {TransactionActionTypes} from "../actionTypes";
import {TransactionActionCreators} from "../actionCreators";
import {TransactionApi} from "../externalApi";
import {AppConstants} from "../../config/constants";

function* getTransactionPageSaga(action) {
    try {
        const searchSettings = action.payload;

        const response = yield call(TransactionApi.getTransactionsPage, AppConstants.NUMBER_OF_ITEMS_PER_PAGE, searchSettings);
        yield put(TransactionActionCreators.getTransactionsPageSuccess(response.data));
    } catch (e) {
        yield put(TransactionActionCreators.getTransactionsPageFailure(e.message));
    }
}

export function* getTransactionPageWatcher() {
    yield takeLatest(TransactionActionTypes.GET_TRANSACTIONS_PAGE_REQUEST, getTransactionPageSaga);
}

function* getTransactionsCountSaga(action) {
    try {
        const filters = action.payload;

        const response = yield call(TransactionApi.getTransactionsCount, filters);
        yield put(TransactionActionCreators.getTransactionsCountSuccess(response.data));
    } catch(e) {
        yield put(TransactionActionCreators.getTransactionsCountFailure(e.message));
    }
}

export function* getTransactionsCountWatcher() {
    yield takeLatest(TransactionActionTypes.GET_TRANSACTIONS_COUNT_REQUEST, getTransactionsCountSaga);
}
