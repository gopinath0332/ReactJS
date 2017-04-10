import React,{Component} from "react";
import {render} from "react-dom";
import $ from "jquery";
import {Provider} from "react-redux";

import store from "./store";
import {getBooks,addBook} from "./actions/books";
import Layout from "./views/layout";

const [targetNode] = $("#content");

render(<Provider store={store}><Layout/></Provider>,targetNode);