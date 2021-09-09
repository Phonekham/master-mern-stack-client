import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

import App from "./App";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// store
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
