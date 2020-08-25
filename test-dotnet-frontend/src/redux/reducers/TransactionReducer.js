import { TransactionActionTypes } from '../actionTypes';
import { AppConstants } from '../../config/constants';

const initialState = {
	transactions: [],
	numberOfTransactions: 0,

	isTransactionsPageLoading: true,
	isTransactionsCountLoading: true,
	transactionsPageError: '',
	transactionsCountError: '',

	areTransactionsImporting: false,
	isTransactionImportFinished: false,
	importError: '',

	desiredPageNumber: 1,
	actualPageNumber: 1,
	pagesCount: 1,

	transactionStatusesFilter: [],
	transactionTypesFilter: [],
	//isDataActualTrigger: false,
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
				//actualPageNumber: 1,
				//isDataActualTrigger: !state.isDataActualTrigger,
				importError: '',
			};

		case TransactionActionTypes.ADD_IMPORTED_TRANSACTIONS_FAILURE:
			return {
				...state,
				areTransactionsImporting: false,
				isTransactionImportFinished: false,
				importError: action.payload,
			};

		// TODO: process all possible outcomes
		case TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_REQUEST:
			return {
				...state,
			};

		case TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_SUCCESS:
			return {
				...state,
			};

		case TransactionActionTypes.GET_EXPORTED_TRANSACTIONS_FAILURE:
			return {
				...state,
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
				//isDataActualTrigger: !state.isDataActualTrigger,
				//transactions: state.transactions.map(transaction => transaction.id === action.payload.transactionId ? {...transaction, status: action.payload.newStatus} : transaction)
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
				//isDataActualTrigger: !state.isDataActualTrigger,
				// currentPageNumber:
				// 	state.transactions.length < 2
				// 		? state.currentPageNumber - 1
				// 		: state.currentPageNumber,
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
