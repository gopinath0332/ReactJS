import React, {Component} from "react";
import {render} from "react-dom";
import $ from "jquery";
import "../../less/app.less";
import _ from "lodash";

import {createStore} from "redux";

class Todos extends Component {
    constructor() {
        super();
        this.add = this.add.bind(this);
        // this.toggle = this.toggle.bind(this);
    }
    add() {
        let value = this.name.value;
        store.dispatch({type: "ADD", payload: value});
    }
    toggle(evt){
      $(evt.target).toggleClass("strike");
    }
    render() {
      let tasks = this.props.tasks.map((task,index)=><li key={index} onClick={this.toggle}>{task}</li>);
        return (
            <div>
                <input type="text" ref={(node) => this.name = node}/>
                <button className="btn btn-default" onClick={this.add}>Add</button>
                <hr/>
                <ul>{tasks}</ul>
            </div>
        );
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case "ADD":
            state.push(action.payload);
            break;
        default:
            console.debug("no default action handler in reducer");
    }
    return state;
}

const store = createStore(reducer);

render(
    <Todos tasks={store.getState()}></Todos>, document.getElementById("content"));

store.subscribe(() => {
    console.debug(store.getState());
    render(
        <Todos tasks={store.getState()}></Todos>, document.getElementById("content"));
});