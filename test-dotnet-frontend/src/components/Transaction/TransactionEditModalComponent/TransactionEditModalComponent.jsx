import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppConstants } from '../../../config/constants';
import { TransactionActionCreators } from '../../../redux/actionCreators';

import Modal from 'react-bootstrap/cjs/Modal';
import Select from 'react-select';
import Button from 'react-bootstrap/cjs/Button';

const TransactionEditModalComponent = (prop) => {
	const dispatch = useDispatch();

	const [status, changeStatus] = useState({
		value: prop.transaction.status.toLowerCase(),
		label: prop.transaction.status,
	});

	const closeEditModal = () => {
		changeStatus({
			value: prop.transaction.status.toLowerCase(),
			label: prop.transaction.status,
		});
		prop.setShowEdit(false);
	};

	const saveEditModal = () => {
		if (status.label !== prop.transaction.status)
			dispatch(
				TransactionActionCreators.updateTransactionStatusRequest(
					prop.transaction.id,
					status.label
				)
			);
		prop.setShowEdit(false);
	};

	return (
		<Modal show={prop.showEdit} onHide={closeEditModal} centered>
			<Modal.Header closeButton>
				<Modal.Title>Edit a transaction</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Change a transaction status:</p>
				<Select
					placeholder={'Statuses'}
					options={[
						{
							options: AppConstants.TRANSACTION_STATUSES.map((status) => ({
								value: status.toLowerCase(),
								label: status,
							})),
						},
					]}
					closeMenuOnSelect={false}
					onChange={changeStatus}
					defaultValue={status}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={closeEditModal}>
					Close
				</Button>
				<Button variant='primary' onClick={saveEditModal}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default TransactionEditModalComponent;
