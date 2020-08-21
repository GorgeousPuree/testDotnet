import React from 'react';

import TransactionActionButtonsComponent from '../TransactionActionButtons/TransactionActionButtonsComponents';

const TransactionElementComponent = (prop) => {
	return (
		<tr>
			<td>{prop.transaction.id}</td>
			<td>{prop.transaction.status}</td>
			<td>{prop.transaction.type}</td>
			<td>{prop.transaction.clientName}</td>
			<td>${prop.transaction.amount}</td>
			<td>
				<TransactionActionButtonsComponent transaction={prop.transaction} />
			</td>
		</tr>
	);
};

export default TransactionElementComponent;
