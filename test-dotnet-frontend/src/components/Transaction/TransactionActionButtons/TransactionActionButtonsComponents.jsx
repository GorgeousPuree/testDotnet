import React, { useState } from 'react';
import Button from 'react-bootstrap/cjs/Button';

import Container from 'react-bootstrap/cjs/Container';
import Row from 'react-bootstrap/cjs/Row';
import Col from 'react-bootstrap/cjs/Col';

import TransactionEditModalComponent from '../TransactionEditModal/TransactionEditModalComponent';
import TransactionDeleteModalComponent from '../TransactionDeleteModal/TransactionDeleteModalComponent';
import { useSelector } from 'react-redux';

const TransactionActionButtonsComponent = (prop) => {
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);

	const isTransactionsPageLoading = useSelector(
		(state) => state.TransactionReducer.isTransactionsPageLoading
	);
	const isTransactionsCountLoading = useSelector(
		(state) => state.TransactionReducer.isTransactionsCountLoading
	);
	const areTransactionsImporting = useSelector(
		(state) => state.TransactionReducer.areTransactionsImporting
	);
	const areTransactionsExporting = useSelector(
		(state) => state.TransactionReducer.areTransactionsExporting
	);

	return (
		<div>
			<Container fluid={'true'}>
				<Row noGutters={true} className={'justify-content-between'}>
					<Col sm={12} md={5}>
						<Button
							disabled={
								isTransactionsPageLoading ||
								isTransactionsCountLoading ||
								areTransactionsImporting ||
								areTransactionsExporting
							}
							className={'btn-block'}
							variant={'info'}
							onClick={() => setShowEdit(true)}
						>
							Edit
						</Button>
					</Col>
					<Col sm={12} md={5}>
						<Button
							disabled={
								isTransactionsPageLoading ||
								isTransactionsCountLoading ||
								areTransactionsImporting ||
								areTransactionsExporting
							}
							className={'btn-block'}
							variant={'danger'}
							onClick={() => setShowDelete(true)}
						>
							Delete
						</Button>
					</Col>
				</Row>
			</Container>
			<TransactionEditModalComponent
				transaction={prop.transaction}
				showEdit={showEdit}
				setShowEdit={setShowEdit}
			/>
			<TransactionDeleteModalComponent
				transactionId={prop.transaction.id}
				showDelete={showDelete}
				setShowDelete={setShowDelete}
			/>
		</div>
	);
};

export default TransactionActionButtonsComponent;
