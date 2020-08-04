import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/';
const transactionUrl = baseUrl + "transactions/";

export const TransactionApi = {
    addImportedTransactions: (csv) => axios.post( + "import/", csv),

    getExportedTransactions: (status, type) => axios.get(transactionUrl + "export/",
        {params: {status: status, type: type}}),

    getTransactionsCount: (filters) => axios.get(transactionUrl + "count",
        {params: {status: filters.status, type: filters.type}}),

    getTransactionsPage: (numberOfItemsPerPage, searchSettings) => axios.get(transactionUrl + "page/" + searchSettings.pageNumber + "/",
        {params: {status: searchSettings.filters.status, type: searchSettings.filters.type, numberOfItemsPerPage: numberOfItemsPerPage}}),


    updateTransactionStatus: (id, status) => axios.put(transactionUrl + id + "/", status),

    deleteTransaction: (id) => axios.delete(transactionUrl + id + "/")
};
