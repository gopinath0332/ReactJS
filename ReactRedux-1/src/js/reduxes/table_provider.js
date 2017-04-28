import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "../../less/app.less";
import App from "../views/TablePage";
import store from "../store/tableStore";


const target = document.getElementById("content");

render(
	<Provider store={store}>
		<App />
	</Provider>,
	target);
