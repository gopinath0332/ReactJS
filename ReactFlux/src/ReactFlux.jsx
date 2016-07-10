var React = require("react"),
    ReactDom = require("react-dom"),
    $ = require("jquery");

import Table from "./Table.jsx";
import Store from "./Store.jsx";

const [targetNode] = $("#content");

var Flux = React.createClass({
    getInitialState: function() {
        return {data: Store.getData()};
    },
    render: function() {
        return (
            <div>
                <h1>React Flux Example..</h1>
                <Table data={this.state.data}></Table>
            </div>
        );
    }
});

// class Flux extends React.Component {
//     constructor() {
//         super();
//         this.data = Store.getData();
//     }
//     render() {
//         console.debug("render:::");
//         return (
//             <div>
//                 <h1>React Flux Example..</h1>
//                 <Table data={this.data}></Table>
//             </div>
//         );
//     }
// }

ReactDom.render(
    <Flux></Flux>, targetNode);
