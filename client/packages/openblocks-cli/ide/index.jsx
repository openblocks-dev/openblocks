import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "openblocks-sdk/dist/style.css";

window.__OPENBLOCKS_DEV__ = {};
const root = document.querySelector("#root");
ReactDOM.render(<App />, root);
