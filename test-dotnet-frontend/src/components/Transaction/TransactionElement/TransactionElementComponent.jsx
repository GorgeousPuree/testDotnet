import React from "react";

const TransactionElementComponent = (props) => {
    return (
        <tr>
            <td>{props.transaction.id}</td>
            <td>{props.transaction.status}</td>
            <td>{props.transaction.type}</td>
            <td>{props.transaction.clientName}</td>
            <td>${props.transaction.amount}</td>
        </tr>
    )
};

export default TransactionElementComponent;
