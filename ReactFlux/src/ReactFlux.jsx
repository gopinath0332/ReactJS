var React = require("react"),
    ReactDom = require("react-dom"),
    $ = require("jquery");

import Table from "./Table.jsx";
import Form from "./Form.jsx";

import Store from "./Store.jsx";

const [targetNode] = $("#content");

var Flux = React.createClass({
    getInitialState: function() {
        return {data: Store.getData()};
    },
    componentWillMount: function() {
        Store.on("store_update", this.updateData);
    },
    updateData: function() {
        this.setState({data: Store.getData()});
    },
    componentWillUnmount: function() {
        Store.removeListener("store_update", this.updateData);
    },
    render: function() {
        return (
            <div>
                <h1>React Flux Example..</h1>
                <Form></Form>
                <Table data={this.state.data}></Table>
            </div>
        );
    }
});

ReactDom.render(
    <Flux></Flux>, targetNode);
