import React from 'react';
import { useDispatch } from 'react-redux';

import { TransactionActionCreators } from '../../../redux/actionCreators';

import Modal from 'react-bootstrap/cjs/Modal';
import Button from 'react-bootstrap/cjs/Button';

const TransactionDeleteModalComponent = (prop) => {
	const dispatch = useDispatch();

	const deleteTransaction = () => {
		dispatch(
			TransactionActionCreators.deleteTransactionRequest(prop.transactionId)
		);
		prop.setShowDelete(false);
	};

	return (
		<Modal
			show={prop.showDelete}
			onHide={() => prop.setShowDelete(false)}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>Delete a transaction</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Are you sure you want to delete this transaction (id ={' '}
				{prop.transactionId})?
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => prop.setShowDelete(false)}>
					No
				</Button>
				<Button variant='danger' onClick={deleteTransaction}>
					Yes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default TransactionDeleteModalComponent;
