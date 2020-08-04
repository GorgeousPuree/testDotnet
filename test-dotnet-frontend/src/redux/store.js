import { createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from 'redux-saga'
import { reducers } from "./reducers"
import {rootSaga} from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

sagaMiddleware.run(rootSaga);
