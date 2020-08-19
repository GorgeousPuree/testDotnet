import {TransactionActionTypes} from "../actionTypes";
import {AppConstants} from "../../config/constants";

const initialState = {
    transactions: [],

    isTransactionsPageLoading: true,
    isTransactionsCountLoading: true,
    transactionsPageError: "",
    transactionsCountError: "",

    areTransactionsImporting: false,
    isTransactionImportFinished: false,
    importError: "",

    pageNumber: 1,
    pagesCount: 1,

    transactionStatusesFilter: [],
    transactionTypesFilter: [],
    isDataActualTrigger: false
};

export const TransactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_REQUEST:
            return {
                ...state,
                areTransactionsImporting: true,
                isTransactionImportFinished: false
            };

        case TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                areTransactionsImporting: false,
                isTransactionImportFinished: true,
                pageNumber: 1,
                isDataActualTrigger: !state.isDataActualTrigger,
                importError: ""
            };

        case TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_FAILURE:
            return {
                ...state,
                areTransactionsImporting: false,
                isTransactionImportFinished: false,
                importError: action.payload
            };

        // TODO: process all possible outcomes
        case TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_REQUEST:
            return {
                ...state,
            };

        case TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_SUCCESS:
            return {
                ...state
            };

        case  TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_FAILURE:
            return {
                ...state
            };

        case TransactionActionTypes.GET_TRANSACTIONS_PAGE_REQUEST:
            return {
                ...state,
                isTransactionsPageLoading: true
            };

        case TransactionActionTypes.GET_TRANSACTIONS_PAGE_SUCCESS:
            return {
                ...state,
                isTransactionsPageLoading: false,
                transactions: action.payload,
                transactionsPageError: ""
            };

        case TransactionActionTypes.GET_TRANSACTIONS_PAGE_FAILURE:
            return {
                ...state,
                isTransactionsPageLoading: true,
                transactionsPageError: action.payload
            };

        case TransactionActionTypes.GET_TRANSACTIONS_COUNT_REQUEST:
            return {
                ...state,
                isTransactionsCountLoading: true,
            };

        case TransactionActionTypes.GET_TRANSACTIONS_COUNT_SUCCESS:
            return {
                ...state,
                isTransactionsCountLoading: false,
                pagesCount: Math.ceil(action.payload / AppConstants.NUMBER_OF_ITEMS_PER_PAGE),
                transactionsCountError: ""
            };

        case TransactionActionTypes.GET_TRANSACTIONS_COUNT_FAILURE:
            return {
                ...state,
                isTransactionsCountLoading: true,
                transactionsCountError: action.payload
            };

        case TransactionActionTypes.SET_TRANSACTION_STATUSES_FILTER:
            return {
                ...state,
                transactionStatusesFilter: action.payload
            };

        case TransactionActionTypes.SET_TRANSACTION_TYPES_FILTER:
            return {
                ...state,
                transactionTypesFilter: action.payload
            };

        case TransactionActionTypes.UPDATE_TRANSACTION_STATUS_REQUEST:
            return {
                ...state
            };

        case TransactionActionTypes.UPDATE_TRANSACTION_STATUS_SUCCESS:
            return {
                ...state,
                transactionsPageError: "",
                isDataActualTrigger: !state.isDataActualTrigger
                //transactions: state.transactions.map(transaction => transaction.id === action.payload.transactionId ? {...transaction, status: action.payload.newStatus} : transaction)
            };

        case TransactionActionTypes.UPDATE_TRANSACTION_STATUS_FAILURE:
            return {
                ...state,
                transactionsPageError: action.payload
            };

        default:
            return state
    }
};
