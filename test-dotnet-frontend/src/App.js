import React from 'react';
import AppStyles from './App.module.css';
import {store} from './redux/store'
import {Provider} from "react-redux";

import TransactionListComponent from "./components/Transaction/TransactionList/TransactionListComponent";

function App() {
  return (
      <Provider store={store}>
          <div className={AppStyles.app_wrapper}>
              <TransactionListComponent/>
          </div>
      </Provider>
  );
}

export default App;
