import { TransactionActionTypes } from '../actionTypes';
import { AppConstants } from '../../config/constants';

const initialState = {
	transactions: [],
	numberOfTransactions: 0,

	isTransactionsPageLoading: true,
	isTransactionsCountLoading: true,
	isFirstLoad: true,
	transactionsPageError: '',
	transactionsCountError: '',

	areTransactionsImporting: false,
	isTransactionImportFinished: false,
	importError: '',

	areTransactionsExporting: false,
	isTransactionExportFinished: false,
	exportError: '',

	desiredPageNumber: 1,
	actualPageNumber: 1,
	pagesCount: 1,

	transactionStatusesFilter: [],
	transactionTypesFilter: [],
};

export const TransactionReducer = (state = initialState, action) => {
	switch (action.type) {
		case TransactionActionTypes.LOAD_TRANSACTION_DATA:
			return {
				...state,
			};

		case TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_REQUEST:
			return {
				...state,
				areTransactionsImporting: true,
				isTransactionImportFinished: false,
			};

		case TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_SUCCESS:
			return {
				...state,
				areTransactionsImporting: false,
				isTransactionImportFinished: true,
				importError: '',
			};

		case TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_FAILURE:
			return {
				...state,
				areTransactionsImporting: false,
				isTransactionImportFinished: false,
				importError: action.payload,
			};

		case TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_REQUEST:
			return {
				...state,
				areTransactionsExporting: true,
				isTransactionExportFinished: false,
			};

		case TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_SUCCESS:
			return {
				...state,
				areTransactionsExporting: false,
				isTransactionExportFinished: true,
				exportError: '',
			};

		case TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_FAILURE:
			return {
				...state,
				areTransactionsExporting: false,
				isTransactionExportFinished: false,
				exportError: action.payload,
			};

		case TransactionActionTypes.GET_TRANSACTIONS_PAGE_REQUEST:
			return {
				...state,
				isTransactionsPageLoading: true,
			};

		case TransactionActionTypes.GET_TRANSACTIONS_PAGE_SUCCESS:
			return {
				...state,
				isTransactionsPageLoading: false,
				transactions: action.payload,
				numberOfTransactions: action.payload.length,
				transactionsPageError: '',
				isFirstLoad: false,
			};

		case TransactionActionTypes.GET_TRANSACTIONS_PAGE_FAILURE:
			return {
				...state,
				isTransactionsPageLoading: true,
				transactionsPageError: action.payload,
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
				pagesCount: Math.ceil(
					action.payload / AppConstants.NUMBER_OF_ITEMS_PER_PAGE
				),
				transactionsCountError: '',
			};

		case TransactionActionTypes.GET_TRANSACTIONS_COUNT_FAILURE:
			return {
				...state,
				isTransactionsCountLoading: true,
				transactionsCountError: action.payload,
			};

		case TransactionActionTypes.SET_TRANSACTION_STATUSES_FILTER:
			return {
				...state,
				transactionStatusesFilter: action.payload,
				desiredPageNumber:
					JSON.stringify(action.payload) !==
					JSON.stringify(state.transactionStatusesFilter)
						? 1
						: state.desiredPageNumber,
			};

		case TransactionActionTypes.SET_TRANSACTION_TYPES_FILTER:
			return {
				...state,
				transactionTypesFilter: action.payload,
				desiredPageNumber:
					JSON.stringify(action.payload) !==
					JSON.stringify(state.transactionTypesFilter)
						? 1
						: state.desiredPageNumber,
			};

		case TransactionActionTypes.UPDATE_TRANSACTION_STATUS_REQUEST:
			return {
				...state,
			};

		case TransactionActionTypes.UPDATE_TRANSACTION_STATUS_SUCCESS:
			return {
				...state,
				transactionsPageError: '',
			};

		case TransactionActionTypes.UPDATE_TRANSACTION_STATUS_FAILURE:
			return {
				...state,
				transactionsPageError: action.payload,
			};

		case TransactionActionTypes.DELETE_TRANSACTION_REQUEST:
			return {
				...state,
			};

		case TransactionActionTypes.DELETE_TRANSACTION_SUCCESS:
			return {
				...state,
				transactionsPageError: '',
			};

		case TransactionActionTypes.DELETE_TRANSACTION_FAILURE:
			return {
				...state,
				transactionsPageError: action.payload,
			};

		case TransactionActionTypes.SET_DESIRED_PAGE_NUMBER:
			return {
				...state,
				desiredPageNumber: action.payload,
			};

		case TransactionActionTypes.SET_ACTUAL_PAGE_NUMBER:
			return {
				...state,
				actualPageNumber: action.payload,
			};

		default:
			return state;
	}
};
