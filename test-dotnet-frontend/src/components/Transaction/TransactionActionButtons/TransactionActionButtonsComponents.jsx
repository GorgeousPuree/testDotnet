import React from "react";
import Button from "react-bootstrap/cjs/Button";

import TransactionActionButtonsStyles from "./TransactionActionButtonsComponent.module.css"
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";

const TransactionActionButtonsComponent = () => {
    return <div className={TransactionActionButtonsStyles.transactionActionButtonsWrapper}>
        <Container fluid={"true"}>
            <Row noGutters={true} className={"justify-content-between"}>
                <Col sm={12} md={5}>
                    <Button className={"btn-block"} variant={"info"}>Edit</Button>
                </Col>
                <Col sm={12} md={5}>
                    <Button className={"btn-block"} variant={"danger"}>Delete</Button>
                </Col>
            </Row>
        </Container>
    </div>
};

export default TransactionActionButtonsComponent;
