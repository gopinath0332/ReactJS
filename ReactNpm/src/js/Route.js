var React = require("react"),
    ReactDom = require("react-dom"),
    $ = require("jquery");
const [targetNode] = $("#content");

var nodes = [<h1>React Routing</h1>, <h1>React Routing</h1>, <h1>React Routing</h1>];

ReactDom.render(<div>{nodes}</div>, targetNode);
