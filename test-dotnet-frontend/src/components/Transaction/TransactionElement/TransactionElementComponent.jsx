import React from "react";

import Button from "react-bootstrap/cjs/Button";
import TransactionActionButtonsComponent from "../TransactionActionButtons/TransactionActionButtonsComponents";

const TransactionElementComponent = (props) => {
    return (
        <tr>
            <td>{props.transaction.id}</td>
            <td>{props.transaction.status}</td>
            <td>{props.transaction.type}</td>
            <td>{props.transaction.clientName}</td>
            <td>${props.transaction.amount}</td>
            <td>
                <TransactionActionButtonsComponent transaction={props.transaction}/>
            </td>
        </tr>
    )
};

export default TransactionElementComponent;
