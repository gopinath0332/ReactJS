var React = require("react"),
    ReactDom = require("react-dom"),
    $ = require("jquery");
import {Router, Route, IndexRoute, hashHistory, Link} from "react-router";

const [targetNode] = $("#content");
const viewStyle = {
    clear: {
        clear: "both"
    }

}

class MenuLink extends React.Component {
    constructor() {
        super();
    }
    changeNavClass(e) {
        var [activeNode] = $(".active");
        $(activeNode).removeClass("active");
        $(e.target.parentNode).addClass("active");
    }
    render() {
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
                <div style={viewStyle.clear}>{this.props.children}</div>
            </ul>
        );
    }
}

class View1 extends React.Component {
    render() {
        return (
            <h1>This is View 1</h1>
        );
    }
}

class View2 extends React.Component {
    render() {
        return (
            <div>View 2</div>
        );
    }
}

class View3 extends React.Component {
    render() {
        return (
            <h1>This is View 3</h1>
        );
    }
}

ReactDom.render(
    <div>
    <Router history={hashHistory}>
        <Route path="/" component={MenuLink}>
            <IndexRoute component={View1}></IndexRoute>
            <Route path="/view2" url="js/view2.html" component={View2}></Route>
            <Route path="/view1" component={View1}></Route>
            <Route path="/view3" component={View3}></Route>
        </Route>
    </Router>
</div>, targetNode);;
