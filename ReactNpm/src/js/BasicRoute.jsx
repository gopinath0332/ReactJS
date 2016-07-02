var React = require("react"),
    ReactDom = require("react-dom"),
    $ = require("jquery");
import {Router, Route, IndexRoute, hashHistory, Link} from "react-router";

const [targetNode] = $("#content");
const viewStyle = {
    clear: "both"
}

var MenuLink = React.createClass({
    changeNavClass: function(e) {
        var [activeNode] = $(".active");
        $(activeNode).removeClass("active");
        $(e.target.parentNode).addClass("active");
    },
    render: function() {
        return (
            <ul class="nav nav-pills">
                <li role="presentation" onClick={this.changeNavClass} class="active">
                    <Link to="view1" class="btn btn-default">View1</Link>
                </li>
                <li role="presentation" onClick={this.changeNavClass}>
                    <Link to="view2" class="btn btn-default">View2</Link>
                </li>
                <li role="presentation" onClick={this.changeNavClass}>
                    <Link to="view3" class="btn btn-default">View3</Link>
                </li>
                <div style={viewStyle}>{this.props.children}</div>
            </ul>
        );
    }
});

var View1 = React.createClass({
    render: function() {
        return (
            <h1>View1</h1>
        );
    }
});

var View2 = React.createClass({
    render: function() {
        return (
            <h1>View2</h1>
        );
    }
});

var View3 = React.createClass({
    render: function() {
        return (
            <h1>View3</h1>
        );
    }
});

ReactDom.render(
    <div>
    <Router history={hashHistory}>
        <Route path="/" component={MenuLink}>
            <IndexRoute component={View1}></IndexRoute>
            <Route path="/view2" component={View2}></Route>
            <Route path="/view1" component={View1}></Route>
            <Route path="/view3" component={View3}></Route>
        </Route>
    </Router>
</div>, targetNode);;
