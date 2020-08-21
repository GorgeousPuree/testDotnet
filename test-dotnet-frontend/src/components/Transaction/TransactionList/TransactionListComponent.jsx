import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

import { TransactionActionCreators } from '../../../redux/actionCreators';
import TransactionElementComponent from '../TransactionElement/TransactionElementComponent';

const TransactionListComponent = () => {
	const dispatch = useDispatch();

	const isDataActualTrigger = useSelector(
		(state) => state.TransactionReducer.isDataActualTrigger
	);
	const transactionStatusesFilter = JSON.stringify(
		useSelector((state) => state.TransactionReducer.transactionStatusesFilter)
	);
	const transactionTypesFilter = JSON.stringify(
		useSelector((state) => state.TransactionReducer.transactionTypesFilter)
	);

	useEffect(() => {
		dispatch(TransactionActionCreators.getTransactionsPageRequest());
		dispatch(TransactionActionCreators.getTransactionsCountRequest());
	}, [isDataActualTrigger, transactionStatusesFilter, transactionTypesFilter]);

	const transactions = useSelector(
		(state) => state.TransactionReducer.transactions
	);
	const isTransactionsPageLoading = useSelector(
		(state) => state.TransactionReducer.isTransactionsPageLoading
	);
	const isTransactionsCountLoading = useSelector(
		(state) => state.TransactionReducer.isTransactionsCountLoading
	);

	return isTransactionsPageLoading || isTransactionsCountLoading ? (
		<div className={'justify-content-center text-center'}>Loading</div>
	) : (
		<Table responsive={true} striped bordered hover>
			<thead>
				<tr>
					<th>Id</th>
					<th>Status</th>
					<th>Type</th>
					<th>Client name</th>
					<th>Amount</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{transactions.map((transaction) => {
					return (
						<TransactionElementComponent
							key={transaction.id}
							transaction={transaction}
						/>
					);
				})}
			</tbody>
		</Table>
	);
};

export default TransactionListComponent;
