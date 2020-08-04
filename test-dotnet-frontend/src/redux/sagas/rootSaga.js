import {fork} from 'redux-saga/effects'
import {getTransactionPageWatcher, getTransactionsCountWatcher} from "./transactionSagas";

export function* rootSaga() {
    yield fork(getTransactionPageWatcher);
    yield fork(getTransactionsCountWatcher);
}
