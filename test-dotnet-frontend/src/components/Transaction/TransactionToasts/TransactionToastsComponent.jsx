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
	const updateTransactionError = useSelector(
		(state) => state.TransactionReducer.updateTransactionError
	);
	const deleteTransactionError = useSelector(
		(state) => state.TransactionReducer.deleteTransactionError
	);

	// TODO: rewrite repeating code
	const [showIsImportRequested, setIsImportRequested] = useState(false);
	const [showIsImportSucceeded, setIsImportSucceeded] = useState(false);
	const [showIsImportErrorOccurred, setIsImportErrorOccurred] = useState(false);
	const [showImportErrorDescription, setImportErrorDescription] = useState('');

	const [showIsExportRequested, setIsExportRequested] = useState(false);
	const [showIsExportSucceeded, setIsExportSucceeded] = useState(false);
	const [showIsExportErrorOccurred, setIsExportErrorOccurred] = useState(false);
	const [showExportErrorDescription, setExportErrorDescription] = useState('');

	const [
		showIsUpdateTransactionErrorOccurred,
		setIsUpdateTransactionErrorOccurred,
	] = useState(false);
	const [
		showUpdateTransactionErrorDescription,
		setUpdateTransactionErrorDescription,
	] = useState('');

	const [
		showIsDeleteTransactionErrorOccurred,
		setIsDeleteTransactionErrorOccurred,
	] = useState(false);
	const [
		showDeleteTransactionErrorDescription,
		setDeleteTransactionErrorDescription,
	] = useState('');

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

	useEffect(() => {
		if (updateTransactionError !== '') {
			setUpdateTransactionErrorDescription(updateTransactionError);
			setIsUpdateTransactionErrorOccurred(true);
		}
	}, [updateTransactionError]);

	useEffect(() => {
		if (deleteTransactionError !== '') {
			setDeleteTransactionErrorDescription(deleteTransactionError);
			setIsDeleteTransactionErrorOccurred(true);
		}
	}, [deleteTransactionError]);

	const commonToastStyle = {
		position: 'absolute',
		top: 0,
		right: 0,
	};

	return (
		<div
			style={{
				position: 'absolute',
				top: 15,
				right: 40,
			}}
		>
			{/*Import toasts*/}
			<Toast
				onClose={() => setIsImportRequested(false)}
				show={showIsImportRequested}
				style={commonToastStyle}
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
				style={commonToastStyle}
			>
				<Toast.Header>
					<strong className='mr-auto'>Import</strong>
				</Toast.Header>
				<Toast.Body>Succeeded!</Toast.Body>
			</Toast>

			<Toast
				onClose={() => setIsImportErrorOccurred(false)}
				show={showIsImportErrorOccurred}
				style={commonToastStyle}
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
				style={commonToastStyle}
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
				style={commonToastStyle}
			>
				<Toast.Header>
					<strong className='mr-auto'>Export</strong>
				</Toast.Header>
				<Toast.Body>Succeeded!</Toast.Body>
			</Toast>

			<Toast
				onClose={() => setIsExportErrorOccurred(false)}
				show={showIsExportErrorOccurred}
				style={commonToastStyle}
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
				style={commonToastStyle}
			>
				<Toast.Header>
					<strong className='mr-auto'>Loading transactions</strong>
				</Toast.Header>
				<Toast.Body>Error! {showTransactionsPageErrorDescription}.</Toast.Body>
			</Toast>

			{/*	Update transaction toasts*/}
			<Toast
				onClose={() => setIsUpdateTransactionErrorOccurred(false)}
				show={showIsUpdateTransactionErrorOccurred}
				style={commonToastStyle}
			>
				<Toast.Header>
					<strong className='mr-auto'>Updating transaction</strong>
				</Toast.Header>
				<Toast.Body>Error! {showUpdateTransactionErrorDescription}.</Toast.Body>
			</Toast>

			{/*	Delete transaction toasts*/}
			<Toast
				onClose={() => setIsDeleteTransactionErrorOccurred(false)}
				show={showIsDeleteTransactionErrorOccurred}
				style={commonToastStyle}
			>
				<Toast.Header>
					<strong className='mr-auto'>Deleting transaction</strong>
				</Toast.Header>
				<Toast.Body>Error! {showDeleteTransactionErrorDescription}.</Toast.Body>
			</Toast>
		</div>
	);
};

export default TransactionToastsComponent;
