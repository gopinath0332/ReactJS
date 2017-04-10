import React, {Component} from "react";
import {render} from "react-dom";

import {createStore} from "redux";

const reducer = (state = 0, action) => {
    switch (action.type) {
        case "INC":
            return state + 1;
            break;
        case "DEC":
            return state - 1;
            break;
        default:
            console.debug("no default action handler");
            return state;
    }
};

let store = createStore(reducer);

store.subscribe(()=>{
  render(
      <Counter value={store.getState()}></Counter>, document.getElementById("content"));
});

class Counter extends Component {
    constructor() {
        super();
        this.plus = this.plus.bind(this);
        this.minus = this.minus.bind(this);
    }
    plus() {
      store.dispatch({type:"INC"});
    }
    minus() {
      store.dispatch({type:"DEC"});
    }
    render() {
        return (
            <div>
                <h1>{this.props.value}</h1>
                <button onClick={this.plus}>+</button>
                <button onClick={this.minus}>-</button>
            </div>
        );
    }
}

render(
    <Counter value={store.getState()}></Counter>, document.getElementById("content"));