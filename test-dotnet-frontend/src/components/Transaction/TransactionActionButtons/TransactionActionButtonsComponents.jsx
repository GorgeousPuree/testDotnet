import React, {useState} from "react";
import Button from "react-bootstrap/cjs/Button";

import TransactionActionButtonsStyles from "./TransactionActionButtonsComponent.module.css"
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";

import TransactionEditModalComponent from "../TransactionEditModalComponent/TransactionEditModalComponent";
import TransactionDeleteModalComponent from "../TransactionDeleteModalComponent/TransactionDeleteModalComponent";

const TransactionActionButtonsComponent = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    return <div className={TransactionActionButtonsStyles.transactionActionButtonsWrapper}>
        <Container fluid={"true"}>
            <Row noGutters={true} className={"justify-content-between"}>
                <Col sm={12} md={5}>
                    <Button className={"btn-block"} variant={"info"}
                            onClick={() => setShowEdit(true)}>Edit</Button>
                </Col>
                <Col sm={12} md={5}>
                    <Button className={"btn-block"} variant={"danger"}
                            onClick={() => setShowDelete(true)}>Delete</Button>
                </Col>
            </Row>
        </Container>
        <TransactionEditModalComponent transaction={props.transaction} showEdit={showEdit} setShowEdit={setShowEdit}/>
        <TransactionDeleteModalComponent transactionId={props.transaction.id} showDelete={showDelete} setShowDelete={setShowDelete}/>
    </div>
};

export default TransactionActionButtonsComponent;
