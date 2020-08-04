import { TransactionActionTypes } from "../actionTypes";
import { AppConstants} from "../../config/constants";

const initialState = {
    transactions: [],

    isTransactionsPageLoading: true,
    isTransactionsCountLoading: true,
    transactionsPageError: "",
    transactionsCountError: "",

    pageNumber: 1,
    pagesCount: 1,

    status: "",
    type: ""
};

export const TransactionReducer = (state = initialState, action) => {
    switch (action.type) {
        // case TransactionsConstants.ADD_IMPORTED_TRANSACTIONS_REQUEST:
        //     return {
        //         ...state,
        //         isLoading: true
        //     };
        //
        // case TransactionsConstants.ADD_IMPORTED_TRANSACTIONS_SUCCESS:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         transactions: action.payload,
        //         error: ""
        //     };
        //
        // case TransactionsConstants.ADD_IMPORTED_TRANSACTIONS_FAILURE:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         error: action.payload
        //     };
        //
        // case TransactionsConstants.GET_EXPORTED_TRANSACTIONS_REQUEST:
        //     return {
        //         ...state,
        //
        //     }
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

        default:
            return state
    }
};
