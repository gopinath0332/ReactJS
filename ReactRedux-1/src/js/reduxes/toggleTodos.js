import React, {Component} from "react";
import {render} from "react-dom";
import _ from "lodash";

import "../../less/app.less";
import {createStore} from "redux";

let defaultState = {
    "todos": [
        {
            "name": "default task",
            "id": "01",
            "completed": false
        }
    ]
};
const reducer = (state=defaultState, action) => {
    console.debug("b4state:::",state);
    state = _.clone(state);
    switch (action.type) {
        case "ADD":
            let name = action.payload;
            let obj ={name,id:_.now(),completed: false};
            state.todos = state.todos.concat([obj]);
            // state.todos.push(obj);
            break;
        case "FETCH_TODO":
            console.debug("fetching todos");
            //TODO: need to work on fetch todo.
            break;
        case "UPDATE_TODO":
            let list = _.clone(state.todos);
            var obj = _.clone(_.find(list,(item)=>{return item.id == action.payload}));
            obj.completed = !obj.completed;
            var index = _.findIndex(list,(item)=>{return item.id == action.payload});
            if(index >= 0){
              list[index] = obj;
            }
            state.todos = list;
            break;
        default:
            console.debug("no aciton defined for ", action);
    }
    console.debug("after state:::",state);
    return state;
}

const store = createStore(reducer);

class ToggleTodos extends Component {
    constructor() {
        super();
        this.add = this.add.bind(this);
    }
    add(){
      store.dispatch({type:"ADD",payload: this.name.value});
      this.name.value ="";
    }
    updateStatus(evt){
      let id = evt.target.id;
      store.dispatch({type:"UPDATE_TODO",payload:id});
    }
    render() {
        let todos = this.props.todos.todos;
        let list = todos.map((todo)=><li key={todo.id} onClick={this.updateStatus} id={todo.id} className={todo.completed?"strike":""}>{todo.name}</li>);
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