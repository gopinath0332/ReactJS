import React, { Component } from "react";
import { render } from "react-dom";
import _ from "lodash";

import "../../less/app.less";
import { createStore } from "redux";

let defaultState = {
    "todos": [{
        "name": "default task",
        "id": "01",
        "completed": false
    }]
};
const reducer = (state = defaultState, action) => {
    console.debug("b4state:::", state);
    switch (action.type) {
        case "ADD":
            let name = action.payload;
            if (name) {
                let obj = { name, id: _.now(), completed: false };
                state = {...state, todos: state.todos.concat([obj]) };
            } else {
                throw new Error("No task name found.");
            }
            // state.todos = state.todos.concat([obj]);
            // state.todos.push(obj);
            break;
        case "FETCH_TODO":
            console.debug("fetching todos");
            //TODO: need to work on fetch todo.
            break;
        case "UPDATE_TODO":
            let list = _.clone(state.todos);
            let obj1 = _.clone(_.find(list, (item) => {
                return item.id == action.payload;
            }));
            obj1.completed = !obj1.completed;
            var index = _.findIndex(list, (item) => {
                return item.id == action.payload;
            });
            if (index >= 0) {
                list[index] = obj1;
            }
            // state.todos = list;
            state = {...state, todos: list };
            break;
        case "DELETE_TODO":
            let todos = _.filter(state.todos, (todo) => {
                return todo.id != action.payload;
            });
            state = {...state, todos };
            break;
        default:
            console.debug("no aciton defined for ", action);
    }
    console.debug("after state:::", state);
    return state;
};

const store = createStore(reducer);

class ToggleTodos extends Component {
    constructor() {
        super();
        this.add = this.add.bind(this);
    }
    add() { 
        store.dispatch({ type: "ADD", payload: this.name.value });
        this.name.value = "";
    }
    updateStatus(evt) {
        let id = evt.target.id;
        store.dispatch({ type: "UPDATE_TODO", payload: id });
    }
    onDelete(evt) {
        let data = evt.target.dataset;
        let id = data.taskid;
        store.dispatch({ "type": "DELETE_TODO", payload: id });
    }
    render() {
        let todos = this.props.todos.todos;
        let list = todos.map((todo) => <li key={todo.id} >
                <span onClick={this.updateStatus} id={todo.id} className={todo.completed?"strike":""}>{todo.name}</span>
                <button className="btn btn-warning btn-xs" data-taskid={todo.id} onClick={this.onDelete}>X</button>
            </li>);
        return (
            <div>
                <input type="text" className="form-control" ref={(node)=>this.name=node}/>
                <button className="btn btn-default" onClick={this.add}>Add</button>
                <hr/>
                <ul>{list}</ul>
            </div>
        );
    }
}

render(
    <ToggleTodos todos={store.getState()}></ToggleTodos>, document.getElementById("content"));

store.subscribe(() => {
    render(
        <ToggleTodos todos={store.getState()}></ToggleTodos>, document.getElementById("content"));
});
