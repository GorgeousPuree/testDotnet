import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TransactionActionCreators } from '../../../redux/actionCreators';

import TransactionBodyComponentStyles from './TransactionBodyComponent.module.css';
import Container from 'react-bootstrap/cjs/Container';
import Row from 'react-bootstrap/cjs/Row';
import Col from 'react-bootstrap/cjs/Col';

import TransactionFiltersComponent from '../TransactionFilters/TransactionFiltersComponent';
import TransactionCsvButtonsComponent from '../TransactionCsvButtons/TransactionCsvButtonsComponent';
import TransactionTableComponent from '../TransactionTable/TransactionTableComponent';
import TransactionPageChangerComponent from '../TransactionPageChanger/TransactionPageChangerComponent';

const TransactionBodyComponent = () => {
	const dispatch = useDispatch();

	const desiredPageNumber = useSelector(
		(state) => state.TransactionReducer.desiredPageNumber
	);
	const transactionStatusesFilter = JSON.stringify(
		useSelector((state) => state.TransactionReducer.transactionStatusesFilter)
	);
	const transactionTypesFilter = JSON.stringify(
		useSelector((state) => state.TransactionReducer.transactionTypesFilter)
	);

	useEffect(() => {
		dispatch(TransactionActionCreators.loadTransactionData());
	}, [desiredPageNumber, transactionStatusesFilter, transactionTypesFilter]);

	return (
		<div className={TransactionBodyComponentStyles.transactionBodyWrapper}>
			<Container fluid={'true'}>
				<Row noGutters={true} className={'justify-content-between'}>
					<Col sm={12} md={8} className={'text-left '}>
						<TransactionFiltersComponent />
					</Col>
					<Col md={3} className={'text-right'}>
						<TransactionCsvButtonsComponent />
					</Col>
				</Row>
			</Container>
			<TransactionTableComponent />
			<TransactionPageChangerComponent />
		</div>
	);
};

export default TransactionBodyComponent;
