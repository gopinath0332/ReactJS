var React = require("react"),
    ReactDom = require("react-dom"),
    $ = require("jquery");

import Table from "./Table.jsx";

const [targetNode] = $("#content");

ReactDom.render(
    <div>
    <h1>React Flux tutorial</h1>
    <Table url="students.json"></Table>
</div>, targetNode);
