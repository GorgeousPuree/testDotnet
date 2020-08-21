import React, { createRef } from 'react';
import { useDispatch } from 'react-redux';
import { TransactionActionCreators } from '../../../redux/actionCreators';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/cjs/Col';
import Row from 'react-bootstrap/cjs/Row';

const TransactionCsvButtonsComponent = () => {
	const dispatch = useDispatch();

	const csvFileRef = createRef();
	const importCsv = () => {
		csvFileRef.current.click();
	};
	const importCsvOnChange = (e) => {
		if (e.target.files[0] === undefined) return;

		let formData = new FormData();
		formData.append('csv', e.target.files[0]);
		dispatch(
			TransactionActionCreators.addImportedTransactionsRequest(formData)
		);
	};

	const exportCsv = () => {
		dispatch(TransactionActionCreators.getExportedTransactionsRequest());
	};

	return (
		<Row className={'justify-content-between'} noGutters={true}>
			<input
				hidden={true}
				type='file'
				ref={csvFileRef}
				onChange={importCsvOnChange}
			/>
			<Col className={'col-margin'}>
				<Button onClick={importCsv} className={'btn-block'}>
					Import
				</Button>
			</Col>
			<Col>
				<Button onClick={exportCsv} className={'btn-block'}>
					Export
				</Button>
			</Col>
		</Row>
	);
};

export default TransactionCsvButtonsComponent;
