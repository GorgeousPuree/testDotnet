import {fork} from 'redux-saga/effects'
import {
    addImportedTransactionsWatcher, getExportedTransactionsWatcher,
    getTransactionPageWatcher,
    getTransactionsCountWatcher
} from "./transactionSagas";

export function* rootSaga() {
    yield fork(getTransactionPageWatcher);
    yield fork(getTransactionsCountWatcher);
    yield fork(addImportedTransactionsWatcher);
    yield fork(getExportedTransactionsWatcher);
}
