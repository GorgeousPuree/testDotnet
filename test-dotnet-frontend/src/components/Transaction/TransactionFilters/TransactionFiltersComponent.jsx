import React, {createRef, useState} from "react";
import {useDispatch} from "react-redux";

import "./TransactionFiltersComponent.css"
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Select from "react-select";
import {AppConstants} from "../../../config/constants";
import {TransactionActionCreators} from "../../../redux/actionCreators";

const TransactionFiltersComponent = () => {
    const dispatch = useDispatch();

    const [filters, changeFilters] = useState([]);
    const selectOptions = [
        {
            label: "Statuses",
            options: [
                {value: "pending", label: "Pending"},
                {value: "completed", label: "Completed"},
                {value: "cancelled", label: "Cancelled"}
            ]
        },
        {
            label: "Types",
            options: [
                {value: "withdrawal", label: "Withdrawal"},
                {value: "refill", label: "Refill"}
            ]
        }
    ];

    const handleSelectBlur = () => {
        const statuses = [];
        const types = [];

        if (filters === null) {
            dispatch(TransactionActionCreators.setTransactionStatusesFilter([]));
            dispatch(TransactionActionCreators.setTransactionTypesFilter([]));
            return;
        }

        filters.forEach(filter => {
            if (AppConstants.TRANSACTION_STATUSES.includes(filter.label)) statuses.push(filter.label);
            else if (AppConstants.TRANSACTION_TYPES.includes(filter.label)) types.push(filter.label);
        });

        dispatch(TransactionActionCreators.setTransactionStatusesFilter(statuses));
        dispatch(TransactionActionCreators.setTransactionTypesFilter(types));
    };

    return (
        <Row noGutters={true}>
            <Col>
                <Select placeholder={"Filters"}
                        options={selectOptions}
                        isMulti closeMenuOnSelect={false}
                        onBlur={() => handleSelectBlur()}
                        onChange={changeFilters}
                        value={filters}/>
            </Col>
        </Row>
    );
};

export default TransactionFiltersComponent;
