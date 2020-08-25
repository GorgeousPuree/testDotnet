import { fork } from 'redux-saga/effects';
import {
	addImportedTransactionsWatcher,
	deleteTransactionWatcher,
	getExportedTransactionsWatcher,
	getTransactionPageWatcher,
	getTransactionsCountWatcher,
	updateTransactionStatusWatcher,
	loadTransactionDataWatcher,
} from './transactionSagas';

export function* rootSaga() {
	yield fork(getTransactionPageWatcher);
	yield fork(getTransactionsCountWatcher);
	yield fork(addImportedTransactionsWatcher);
	yield fork(getExportedTransactionsWatcher);
	yield fork(updateTransactionStatusWatcher);
	yield fork(deleteTransactionWatcher);
	yield fork(loadTransactionDataWatcher);
}
