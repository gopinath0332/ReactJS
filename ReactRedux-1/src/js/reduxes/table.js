import React, { Component } from "react";
import { render } from "react-dom";
import _ from "lodash";
import axios from "axios";
import { createLogger } from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";

import "../../less/app.less";
import { createStore, applyMiddleware } from "redux";

//Reducers
let defaultState = {
    "filter": "",
    "list": []
};
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "GET_LIST":
            return {...state };
            break;
        case "GET_LIST_FULFILLED":
            return {...state, list: action.payload.data, filter: "" };
        case "FILTER_LIST":
            return {...state, filter: action.value };
    }
    return state;
};


// Store
const middleware = applyMiddleware(promiseMiddleware(), createLogger());
const store = createStore(reducer, middleware);


// Action
const action = {
        getList: () => {
            return { "type": "GET_LIST", payload: axios.get("/data/contact.json") };
        },
        filterList: (value) => {
            return { "type": "FILTER_LIST", value };
        }
    }
    // View components
class Table extends Component {
    _getrows() {
        return this.props.rows.map((row, index) => <Row key={index} {...row}></Row>);
    }
    render() {
        let rows = this._getrows();
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Company</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

let Row = (prop) => {
    return (<tr>
        <td>{prop.name}</td>
        <td>{prop.age}</td>
        <td>{prop.gender}</td>
        <td>{prop.company}</td>
        <td>{prop.email}</td>
    </tr>);
}

class APP extends Component {
    onFilter(evt) {
        // let data = this._getFilterdList(evt.target.value);
        store.dispatch(action.filterList(evt.target.value));
    }
    _getFilterdList(value) {
        let data = [];
        let filtervalue = this.props.list.filter;
        if(value != undefined){
            filtervalue = value;
        }
        try {
            data = this.props.list.list.filter((item) => item.name.toLowerCase().includes(filtervalue.toLowerCase()));
        } catch (e) {
            console.error("Error in filtering data", e);
        }
        return data;
    }
    componentWillMount() {
        store.dispatch(action.getList());
    }
    render() {
        // let data = this.props.list.list;
        let data = this._getFilterdList();
        return (
            <div>
                <input type="text" class="form-control"  placeholder="Search ..." onChange={this.onFilter.bind(this)}/>
                <Table rows={data}></Table>
            </div>
        );
    }
}


render(<APP list={store.getState()}></APP>, document.getElementById("content"));

store.subscribe(() => {
    render(<APP list={store.getState()}></APP>, document.getElementById("content"));
});
