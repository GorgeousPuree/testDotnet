import { TransactionActionTypes } from '../actionTypes';

export const TransactionActionCreators = {
	loadTransactionData: () => ({
		type: TransactionActionTypes.LOAD_TRANSACTION_DATA,
	}),

	addImportedTransactionsRequest: (csv) => ({
		type: TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_REQUEST,
		csv: csv,
	}),

	addImportedTransactionsSuccess: () => ({
		type: TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_SUCCESS,
	}),

	addImportedTransactionsFailure: (error) => ({
		type: TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_FAILURE,
		payload: error,
	}),

	getExportedTransactionsRequest: () => ({
		type: TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_REQUEST,
	}),

	getExportedTransactionsSuccess: () => ({
		type: TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_SUCCESS,
	}),

	getExportedTransactionsFailure: (error) => ({
		type: TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_FAILURE,
		payload: error,
	}),

	getTransactionsCountRequest: () => ({
		type: TransactionActionTypes.GET_TRANSACTIONS_COUNT_REQUEST,
	}),

	getTransactionsCountSuccess: (transactionsCount) => ({
		type: TransactionActionTypes.GET_TRANSACTIONS_COUNT_SUCCESS,
		payload: transactionsCount,
	}),

	getTransactionsCountFailure: (error) => ({
		type: TransactionActionTypes.GET_TRANSACTIONS_COUNT_FAILURE,
		payload: error,
	}),

	getTransactionsPageRequest: (currentPageNumber) => ({
		type: TransactionActionTypes.GET_TRANSACTIONS_PAGE_REQUEST,
		currentPageNumber: currentPageNumber,
	}),

	getTransactionsPageSuccess: (transactions) => ({
		type: TransactionActionTypes.GET_TRANSACTIONS_PAGE_SUCCESS,
		payload: transactions,
	}),

	getTransactionsPageFailure: (error) => ({
		type: TransactionActionTypes.GET_TRANSACTIONS_PAGE_FAILURE,
		payload: error,
	}),

	updateTransactionStatusRequest: (transactionId, newStatus) => ({
		type: TransactionActionTypes.UPDATE_TRANSACTION_STATUS_REQUEST,
		newStatus: newStatus,
		transactionId: transactionId,
	}),

	updateTransactionStatusSuccess: () => ({
		type: TransactionActionTypes.UPDATE_TRANSACTION_STATUS_SUCCESS,
	}),

	updateTransactionStatusFailure: (error) => ({
		type: TransactionActionTypes.UPDATE_TRANSACTION_STATUS_FAILURE,
		payload: error,
	}),

	deleteTransactionRequest: (transactionId) => ({
		type: TransactionActionTypes.DELETE_TRANSACTION_REQUEST,
		transactionId: transactionId,
	}),

	deleteTransactionSuccess: () => ({
		type: TransactionActionTypes.DELETE_TRANSACTION_SUCCESS,
	}),

	deleteTransactionFailure: (error) => ({
		type: TransactionActionTypes.DELETE_TRANSACTION_FAILURE,
		payload: error,
	}),

	setTransactionStatusesFilter: (statuses) => ({
		type: TransactionActionTypes.SET_TRANSACTION_STATUSES_FILTER,
		payload: statuses,
	}),

	setTransactionTypesFilter: (types) => ({
		type: TransactionActionTypes.SET_TRANSACTION_TYPES_FILTER,
		payload: types,
	}),

	setDesiredPageNumber: (desiredPageNumber) => ({
		type: TransactionActionTypes.SET_DESIRED_PAGE_NUMBER,
		payload: desiredPageNumber,
	}),

	setActualPageNumber: (actualPageNumber) => ({
		type: TransactionActionTypes.SET_ACTUAL_PAGE_NUMBER,
		payload: actualPageNumber,
	}),
};
