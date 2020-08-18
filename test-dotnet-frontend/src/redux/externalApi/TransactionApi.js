import axios from 'axios';
import qs from "qs"

const baseUrl = 'http://localhost:5000/api/';
const transactionUrl = baseUrl + "transactions/";

axios.interceptors.request.use(config => {
    config.paramsSerializer = params => {
        return qs.stringify(params, {
            arrayFormat: "brackets",
            encode: false
        });
    };
    return config;
});

export const TransactionApi = {
    addImportedTransactions: (csv) => axios.post(transactionUrl + "import", csv, {headers: {'Content-Type': 'multipart/form-data'}}),

    getExportedTransactions: (filters) => axios.get(transactionUrl + "export",
        {
            params: {
                statuses: filters.transactionStatusesFilter,
                types: filters.transactionTypesFilter
            }
        }),

    getTransactionsCount: (filters) => axios.get(transactionUrl + "count",
        {
            params: {
                statuses: filters.transactionStatusesFilter,
                types: filters.transactionTypesFilter
            }
        }),

    getTransactionsPage: (numberOfItemsPerPage, searchSettings) => axios.get(transactionUrl + "page/" + searchSettings.pageNumber + "/",
        {
            params: {
                statuses: searchSettings.transactionFilters.transactionStatusesFilter,
                types: searchSettings.transactionFilters.transactionTypesFilter,
                numberOfItemsPerPage: numberOfItemsPerPage
            }
        }),

    updateTransactionStatus: (id, status) => axios.put(transactionUrl + id + "/", status),

    deleteTransaction: (id) => axios.delete(transactionUrl + id + "/")
};
