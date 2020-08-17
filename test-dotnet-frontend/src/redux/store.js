import { createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from 'redux-saga'
import { reducers } from "./reducers"
import {rootSaga} from "./sagas/rootSaga";
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
export const store = createStore(
    reducers,
    compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

sagaMiddleware.run(rootSaga);
