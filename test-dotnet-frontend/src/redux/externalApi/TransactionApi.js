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

    getExportedTransactions: (status, type) => axios.get(transactionUrl + "export/",
        {params: {status: status, type: type}}),

    getTransactionsCount: (filters) => axios.get(transactionUrl + "count",
        //{params: {status: filters.status, type: filters.type}}),
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
            // paramsSerializer: params => {
            //     return qs.stringify(params)
            // }
            //paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' })
            // params: {
            //     statuses: [1,2,3],
            //     types: [4,5,6],
            //     numberOfItemsPerPage: numberOfItemsPerPage
            // }
        }),


    updateTransactionStatus: (id, status) => axios.put(transactionUrl + id + "/", status),

    deleteTransaction: (id) => axios.delete(transactionUrl + id + "/")
};
