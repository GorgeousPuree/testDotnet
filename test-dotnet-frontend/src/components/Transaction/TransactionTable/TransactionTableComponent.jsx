import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

import TransactionElementComponent from '../TransactionElement/TransactionElementComponent';

const TransactionTableComponent = () => {
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
		<div className={'text-center'}>Loading</div>
	) : (
		<Table size={'sm'} responsive={true} striped bordered hover>
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

export default TransactionTableComponent;
