import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

import TransactionElementComponent from '../TransactionElement/TransactionElementComponent';

const TransactionTableComponent = () => {
	const transactions = useSelector(
		(state) => state.TransactionReducer.transactions
	);
	const isFirstLoad = useSelector(
		(state) => state.TransactionReducer.isFirstLoad
	);

	return isFirstLoad ? (
		<div className={'text-center'}>Loading</div>
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

export default TransactionTableComponent;
