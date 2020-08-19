import {fork} from 'redux-saga/effects'
import {
    addImportedTransactionsWatcher, deleteTransactionWatcher, getExportedTransactionsWatcher,
    getTransactionPageWatcher,
    getTransactionsCountWatcher, updateTransactionStatusWatcher
} from "./transactionSagas";

export function* rootSaga() {
    yield fork(getTransactionPageWatcher);
    yield fork(getTransactionsCountWatcher);
    yield fork(addImportedTransactionsWatcher);
    yield fork(getExportedTransactionsWatcher);
    yield fork(updateTransactionStatusWatcher);
    yield fork(deleteTransactionWatcher);
}
