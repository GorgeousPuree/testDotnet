import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {TransactionActionCreators} from "../../../redux/actionCreators";
import TransactionElementComponent from "../TransactionElement/TransactionElementComponent";

const TransactionListComponent = () => {
    const dispatch = useDispatch();

    const pageNumber = useSelector(state => state.TransactionsReducer.pageNumber);
    const status = useSelector(state => state.TransactionsReducer.status);
    const type = useSelector(state => state.TransactionsReducer.type);

    useEffect(() => {
        dispatch(TransactionActionCreators.getTransactionsPageRequest({
            pageNumber: pageNumber,
            filters: {status: status, type: type}
        }));

        dispatch(TransactionActionCreators.getTransactionsCountRequest({status: status, type: type}));
    }, [pageNumber, status, type]);

    const transactions = useSelector(state => state.TransactionsReducer.transactions);
    const isTransactionsPageLoading = useSelector(state => state.TransactionsReducer.isTransactionsPageLoading);
    const isTransactionsCountLoading = useSelector(state => state.TransactionsReducer.isTransactionsCountLoading);

    return (isTransactionsPageLoading || isTransactionsCountLoading) ?
        <div>loading</div> :
        <div>
            <table>
                <thead>
                <tr>
                    <td>Id</td>
                    <td>Status</td>
                    <td>Type</td>
                    <td>Client name</td>
                    <td>Amount</td>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction, index) => {
                    return <TransactionElementComponent key={index} transaction={transaction}/>
                })}
                </tbody>
            </table>
        </div>
};

export default TransactionListComponent;
