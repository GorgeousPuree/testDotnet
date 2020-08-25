import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Pagination from 'react-bootstrap/cjs/Pagination';
import { TransactionActionCreators } from '../../../redux/actionCreators';

const TransactionPageChangerComponent = () => {
	const dispatch = useDispatch();

	const pagesCount = useSelector(
		(state) => state.TransactionReducer.pagesCount
	);

	const actualPageNumber = useSelector(
		(state) => state.TransactionReducer.actualPageNumber
	);

	const changePage = (desiredPageNumber) => {
		if (desiredPageNumber === actualPageNumber) return;
		dispatch(TransactionActionCreators.setDesiredPageNumber(desiredPageNumber));
	};

	const paginationItems = [];
	for (let i = 0; i < pagesCount; i++) {
		if (actualPageNumber === i + 1)
			paginationItems.push(
				<Pagination.Item
					active
					key={i + 1}
					onClick={() => changePage(i + 1)}
					value={i + 1}
				>
					{i + 1}
				</Pagination.Item>
			);
		else
			paginationItems.push(
				<Pagination.Item
					key={i + 1}
					onClick={() => changePage(i + 1)}
					value={i + 1}
				>
					{i + 1}
				</Pagination.Item>
			);
	}

	return (
		<Pagination className={'justify-content-center'}>
			<Pagination.Prev
				onClick={() =>
					actualPageNumber > 1 ? changePage(actualPageNumber - 1) : true
				}
			/>
			{paginationItems}
			<Pagination.Next
				onClick={() =>
					actualPageNumber < pagesCount
						? changePage(actualPageNumber + 1)
						: true
				}
			/>
		</Pagination>
	);
};

export default TransactionPageChangerComponent;
