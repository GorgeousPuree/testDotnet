import {TransactionActionTypes} from "../actionTypes";

export const TransactionActionCreators = {
    addImportedTransactionsRequest: () => ({
        type: TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_REQUEST,
    }),

    addImportedTransactionsSuccess: () => ({
        type: TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_REQUEST
    }),

    addImportedTransactionsFailure: (error) => ({
        type: TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_REQUEST,
        payload: error
    }),

    getExportedTransactionsRequest: () => ({
        type: TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_REQUEST
    }),

    getExportedTransactionsSuccess: (csv) => ({
        type: TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_SUCCESS,
        payload: csv
    }),

    getExportedTransactionsFailure: (error) => ({
        type: TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_FAILURE,
        payload: error
    }),

    getTransactionsCountRequest: (filters = {status: "", type: ""}) => ({
        type: TransactionActionTypes.GET_TRANSACTIONS_COUNT_REQUEST,
        payload: filters
    }),

    getTransactionsCountSuccess: (transactionsCount) => ({
        type: TransactionActionTypes.GET_TRANSACTIONS_COUNT_SUCCESS,
        payload: transactionsCount
    }),

    getTransactionsCountFailure: (error) => ({
        type: TransactionActionTypes.GET_TRANSACTIONS_COUNT_FAILURE,
        payload: error
    }),

    getTransactionsPageRequest: (searchSettings = {pageNumber: 1, filters: {status: "", type: ""}}) => ({
        type: TransactionActionTypes.GET_TRANSACTIONS_PAGE_REQUEST,
        payload: searchSettings
    }),

    getTransactionsPageSuccess: (transactions) => ({
        type: TransactionActionTypes.GET_TRANSACTIONS_PAGE_SUCCESS,
        payload: transactions
    }),

    getTransactionsPageFailure: (error) => ({
        type: TransactionActionTypes.GET_TRANSACTIONS_PAGE_FAILURE,
        payload: error
    }),

    updateTransactionStatusRequest: () => ({
        type: TransactionActionTypes.UPDATE_TRANSACTION_STATUS_REQUEST
    }),

    updateTransactionStatusSuccess: () => ({
        type: TransactionActionTypes.UPDATE_TRANSACTION_STATUS_SUCCESS
    }),

    updateTransactionStatusFailure: (error) => ({
        type: TransactionActionTypes.UPDATE_TRANSACTION_STATUS_FAILURE,
        payload: error
    }),

    deleteTransactionRequest: () => ({
        type: TransactionActionTypes.DELETE_TRANSACTION_REQUEST
    }),

    deleteTransactionSuccess: () => ({
        type: TransactionActionTypes.DELETE_TRANSACTION_SUCCESS
    }),

    deleteTransactionFailure: (error) => ({
        type: TransactionActionTypes.DELETE_TRANSACTION_FAILURE,
        payload: error
    })
};
