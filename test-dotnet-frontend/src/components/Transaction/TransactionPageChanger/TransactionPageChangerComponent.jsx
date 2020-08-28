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

	// you'd probably don't want to look at this
	const pagination = (c, m) => {
		let current = c,
			last = m,
			delta = c === 1 || c === m ? 1 : 0,
			left = current - delta,
			right = current + delta + 1,
			range = [],
			rangeWithDots = [],
			l,
			isEllipsisOne = true;

		for (let i = 1; i <= last; i++) {
			if (i === 1 || i === last || (i >= left && i < right)) {
				range.push(i);
			}
		}

		for (let i of range) {
			if (l) {
				if (i - l === 2) {
					if (l + 1 === actualPageNumber)
						rangeWithDots.push(
							<Pagination.Item
								active
								key={l + 1}
								onClick={() => changePage(l + 1)}
								value={i + 1}
							>
								{l + 1}
							</Pagination.Item>
						);
					else
						rangeWithDots.push(
							<Pagination.Item
								key={l + 1}
								onClick={() => changePage(l + 1)}
								value={l + 1}
							>
								{l + 1}
							</Pagination.Item>
						);
				} else if (i - l !== 1) {
					let previousElement =
						range[range.findIndex((index) => index === i) - 1];
					rangeWithDots.push(
						isEllipsisOne ? (
							<Pagination.Ellipsis
								onClick={() => changePage(Math.ceil((i - previousElement) / 2))}
							/>
						) : (
							<Pagination.Ellipsis
								onClick={() =>
									changePage(
										previousElement + Math.ceil((i - previousElement) / 2)
									)
								}
							/>
						)
					);
					isEllipsisOne = false;
				}
			}
			if (i === actualPageNumber)
				rangeWithDots.push(
					<Pagination.Item
						active
						key={i}
						onClick={() => changePage(i)}
						value={i}
					>
						{i}
					</Pagination.Item>
				);
			else
				rangeWithDots.push(
					<Pagination.Item key={i} onClick={() => changePage(i)} value={i}>
						{i}
					</Pagination.Item>
				);
			l = i;
		}
		return rangeWithDots;
	};

	return (
		<Pagination className={'justify-content-center'}>
			<Pagination.Prev
				disabled={actualPageNumber === 1}
				onClick={() =>
					actualPageNumber > 1 ? changePage(actualPageNumber - 1) : true
				}
			/>
			{pagination(actualPageNumber, pagesCount)}
			<Pagination.Next
				disabled={actualPageNumber === pagesCount}
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
