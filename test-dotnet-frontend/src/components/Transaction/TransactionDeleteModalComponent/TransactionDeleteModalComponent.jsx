import React from "react";
import {useDispatch} from "react-redux";

import Modal from "react-bootstrap/cjs/Modal";
import Button from "react-bootstrap/cjs/Button";
import {TransactionActionCreators} from "../../../redux/actionCreators";

const TransactionDeleteModalComponent = (props) => {
    const dispatch = useDispatch();

    const deleteTransaction = () => {
        dispatch(TransactionActionCreators.deleteTransactionRequest(props.transactionId));
        props.setShowDelete(false);
    };

    return (
        <Modal show={props.showDelete} onHide={() => props.setShowDelete(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete a transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete transaction?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setShowDelete(false)}>
                    No
                </Button>
                <Button variant="danger" onClick={deleteTransaction}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default TransactionDeleteModalComponent;
