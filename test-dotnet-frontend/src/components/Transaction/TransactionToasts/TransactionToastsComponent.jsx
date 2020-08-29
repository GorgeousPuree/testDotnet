import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Toast from 'react-bootstrap/Toast';

const TransactionToastsComponent = () => {
	const areTransactionsImporting = useSelector(
		(state) => state.TransactionReducer.areTransactionsImporting
	);
	const isTransactionImportFinished = useSelector(
		(state) => state.TransactionReducer.isTransactionImportFinished
	);
	const importError = useSelector(
		(state) => state.TransactionReducer.importError
	);

	const areTransactionsExporting = useSelector(
		(state) => state.TransactionReducer.areTransactionsExporting
	);
	const isTransactionExportFinished = useSelector(
		(state) => state.TransactionReducer.isTransactionExportFinished
	);
	const exportError = useSelector(
		(state) => state.TransactionReducer.exportError
	);

	const transactionsPageError = useSelector(
		(state) => state.TransactionReducer.transactionsPageError
	);

	const [showIsImportRequested, setIsImportRequested] = useState(false);
	const [showIsImportSucceeded, setIsImportSucceeded] = useState(false);
	const [showIsImportErrorOccurred, setIsImportErrorOccurred] = useState(false);
	const [showImportErrorDescription, setImportErrorDescription] = useState('');

	const [showIsExportRequested, setIsExportRequested] = useState(false);
	const [showIsExportSucceeded, setIsExportSucceeded] = useState(false);
	const [showIsExportErrorOccurred, setIsExportErrorOccurred] = useState(false);
	const [showExportErrorDescription, setExportErrorDescription] = useState('');

	const [
		showIsTransactionsPageErrorOccurred,
		setIsTransactionsPageErrorOccurred,
	] = useState(false);
	const [
		showTransactionsPageErrorDescription,
		setTransactionsPageErrorDescription,
	] = useState(transactionsPageError);

	useEffect(() => {
		setIsImportRequested(areTransactionsImporting);
	}, [areTransactionsImporting]);

	useEffect(() => {
		setIsImportSucceeded(isTransactionImportFinished);
	}, [isTransactionImportFinished]);

	useEffect(() => {
		if (importError !== '') {
			setImportErrorDescription(importError);
			setIsImportErrorOccurred(true);
		}
	}, [importError]);

	useEffect(() => {
		setIsExportRequested(areTransactionsExporting);
	}, [areTransactionsExporting]);

	useEffect(() => {
		setIsExportSucceeded(isTransactionExportFinished);
	}, [isTransactionExportFinished]);

	useEffect(() => {
		if (exportError !== '') {
			setExportErrorDescription(exportError);
			setIsExportErrorOccurred(true);
		}
	}, [exportError]);

	useEffect(() => {
		if (transactionsPageError !== '') {
			setTransactionsPageErrorDescription(transactionsPageError);
			setIsTransactionsPageErrorOccurred(true);
		}
	}, [transactionsPageError]);

	return (
		<div
			style={{
				position: 'absolute',
				top: 15,
				right: 15,
			}}
		>
			{/*Import toasts*/}
			<Toast
				onClose={() => setIsImportRequested(false)}
				show={showIsImportRequested}
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
				}}
			>
				<Toast.Header>
					<strong className='mr-auto'>Import</strong>
				</Toast.Header>
				<Toast.Body>Processing...</Toast.Body>
			</Toast>

			<Toast
				onClose={() => setIsImportSucceeded(false)}
				show={showIsImportSucceeded}
				autohide
				delay={4000}
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
				}}
			>
				<Toast.Header>
					<strong className='mr-auto'>Import</strong>
				</Toast.Header>
				<Toast.Body>Succeeded!</Toast.Body>
			</Toast>

			<Toast
				onClose={() => setIsImportErrorOccurred(false)}
				show={showIsImportErrorOccurred}
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
				}}
			>
				<Toast.Header>
					<strong className='mr-auto'>Import</strong>
				</Toast.Header>
				<Toast.Body>Error! {showImportErrorDescription}.</Toast.Body>
			</Toast>

			{/*Export toasts*/}
			<Toast
				onClose={() => setIsExportRequested(false)}
				show={showIsExportRequested}
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
				}}
			>
				<Toast.Header>
					<strong className='mr-auto'>Export</strong>
				</Toast.Header>
				<Toast.Body>Processing...</Toast.Body>
			</Toast>

			<Toast
				onClose={() => setIsExportSucceeded(false)}
				show={showIsExportSucceeded}
				autohide
				delay={4000}
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
				}}
			>
				<Toast.Header>
					<strong className='mr-auto'>Export</strong>
				</Toast.Header>
				<Toast.Body>Succeeded!</Toast.Body>
			</Toast>

			<Toast
				onClose={() => setIsExportErrorOccurred(false)}
				show={showIsExportErrorOccurred}
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
				}}
			>
				<Toast.Header>
					<strong className='mr-auto'>Export</strong>
				</Toast.Header>
				<Toast.Body>Error! {showExportErrorDescription}.</Toast.Body>
			</Toast>

			{/*	Data loading toasts*/}
			<Toast
				onClose={() => setIsTransactionsPageErrorOccurred(false)}
				show={showIsTransactionsPageErrorOccurred}
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
				}}
			>
				<Toast.Header>
					<strong className='mr-auto'>Loading transactions</strong>
				</Toast.Header>
				<Toast.Body>Error! {showTransactionsPageErrorDescription}.</Toast.Body>
			</Toast>
		</div>
	);
};

export default TransactionToastsComponent;
