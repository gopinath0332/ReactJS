import React,{Component} from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory, Link} from "react-router";
import $ from "jquery";

import Home from "./HomePage";
import Book from "./BookPage";
import About from "./AboutPage";
const [targetNode] = $("#content");

class App extends Component{
  render(){
    return (
    <div className="container">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Books</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      {this.props.children}
    </div>
  );
  }
}
ReactDOM.render(
    <div>
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Book}></IndexRoute>
            <Route path="/about" component={About}></Route>
            <Route path="/cart" component={Book}></Route>
            <Route path="/home" component={Home}></Route>
        </Route>
    </Router>
</div>, targetNode);