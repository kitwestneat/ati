import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { isDevEnv } from "./utils";

function startFP(data) {
  ReactDOM.render(<App data={data} />, document.getElementById("root"));
}
window.startFP = startFP;

if (isDevEnv()) {
  startFP(require("./data").data);
}
