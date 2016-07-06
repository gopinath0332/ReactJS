const React = require("react"),
    ReactDom = require("react-dom"),
    $ = require("jquery");

const [targetNode] = $("#content");

var Count = React.createClass({
    componentWillMount: function() {
        console.debug("Component Will Mount");
    },
    componentDidMount: function() {
        console.debug("Component Did Mount");
    },
    componentWillReceiveProps: function(props) {
        console.debug(" Component will reacive props:::", props);
    },
    componentWillUpdate: function(nextProps, nextState) {
        console.debug("Component will update::", nextProps, nextState);
    },
    componentDidUpdate: function(preProps, preState) {
        console.debug("Component did update::", preProps, preState);
    },
    componentWillUnmount: function() {
        console.debug("Component will Unmount");
    },
    render: function() {
        return (
            <div>
                <h2>{this.props.count}</h2>
            </div>
        );
    }
});

var IncreamentApp = React.createClass({
    getInitialState: function() {
        return {"count": 0};
    },
    increament: function() {
        var count = parseInt(this.state.count);
        this.setState({
            "count": count + 1
        });
    },
    render: function() {
        return (
            <div>
                <button className="btn btn-success" onClick={this.increament}>Increament</button>
                <br></br>
                <Count count={this.state.count}></Count>
            </div>
        );
    }
});

ReactDom.render(
    <IncreamentApp></IncreamentApp>, targetNode);

setTimeout(() => {
    ReactDom.unmountComponentAtNode(targetNode);
}, 30000);
