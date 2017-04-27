import React, { Component } from "react";
import { connect } from "react-redux";

import { getList, filterList } from "../actions/tableAction";

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
                        <th>Phone</th>
                        <th>Balance</th>
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
        <td><button type="button" class="btn btn-link">{prop.email}</button></td>
        <td>{prop.phone}</td>
        <td>{prop.balance}</td>
    </tr>);
};

@connect((store) => {
    return {...store };
})
export default class APP extends Component {
    onFilter(evt) {
        // let data = this._getFilterdList(evt.target.value);
        this.props.dispatch(filterList(evt.target.value));
    }
    _getFilterdList(value) {
        let data = [];
        let filtervalue = this.props.filter;
        if (value != undefined) {
            filtervalue = value;
        }
        try {
            data = this.props.list.filter((item) => item.name.toLowerCase().includes(filtervalue.toLowerCase()));
        } catch (e) {
            console.error("Error in filtering data", e);
        }
        return data;
    }
    componentWillMount() {
        this.props.dispatch(getList());
    }
    render() {
        // let data = this.props.list.list;
        let data = this._getFilterdList();
        return (
            <div>
                <input type="text" class="form-control" value={this.props.filter} placeholder="Search ..." onChange={this.onFilter.bind(this)}/>
                <Table rows={data}></Table>
            </div>
        );
    }
}
