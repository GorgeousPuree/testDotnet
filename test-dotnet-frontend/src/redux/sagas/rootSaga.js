import {fork} from 'redux-saga/effects'
import {
    addImportedTransactionsWatcher,
    getTransactionPageWatcher,
    getTransactionsCountWatcher
} from "./transactionSagas";

export function* rootSaga() {
    yield fork(getTransactionPageWatcher);
    yield fork(getTransactionsCountWatcher);
    yield fork(addImportedTransactionsWatcher);
}
