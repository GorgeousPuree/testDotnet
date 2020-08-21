import React from 'react';
import TransactionFiltersComponent from '../TransactionFilters/TransactionFiltersComponent';
import TransactionCsvButtonsComponent from '../TransactionCsvButtons/TransactionCsvButtonsComponent';
import TransactionListComponent from '../TransactionList/TransactionListComponent';
import TransactionPageChangerComponent from '../TransactionPageChanger/TransactionPageChangerComponent';

import TransactionBodyComponentStyles from './TransactionBodyComponent.module.css';
import Container from 'react-bootstrap/cjs/Container';
import Row from 'react-bootstrap/cjs/Row';
import Col from 'react-bootstrap/cjs/Col';

const TransactionBodyComponent = () => {
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
			<TransactionListComponent />
			<TransactionPageChangerComponent />
		</div>
	);
};

export default TransactionBodyComponent;
