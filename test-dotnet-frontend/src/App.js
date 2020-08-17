import React from 'react';
import AppStyles from './App.css';
import {store} from './redux/store'
import {Provider} from "react-redux";
import 'react-app-polyfill/stable';
import 'bootstrap/dist/css/bootstrap.css';

import TransactionBodyComponent from "./components/Transaction/TransactionBody/TransactionBodyComponent";

function App() {
  return (
      <Provider store={store}>
          <div className={"app-wrapper"}>
              <TransactionBodyComponent/>
          </div>
      </Provider>
  );
}

export default App;
