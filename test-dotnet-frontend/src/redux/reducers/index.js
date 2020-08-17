import { combineReducers } from "redux";
import {TransactionReducer} from "./TransactionReducer";

export const reducers = combineReducers({
    TransactionReducer: TransactionReducer
});
