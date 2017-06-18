import React, { Component } from "react";
import { connect } from "react-redux";

import { getList, filterList, showForm, hideForm, addUser } from "../actions/tableAction";

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

class Form extends Component {
	addUser() {
		let payload = {
			name: this.name.value,
			age: this.age.value,
			gender: this.gender.value,
			company: this.company.value,
			email: this.email.value,
			phone: this.phone.value,
			balance: "$"+this.balance.value
		};
		this.props.dispatch(addUser(payload));
	}
	closeForm() {
		this.props.dispatch(hideForm());
	}
	render() {
		return (
			<div>
				<div>
					<button onClick={this.closeForm.bind(this)} className="btn btn-default right">X</button>
				</div>
				<div>
					<h3>Form Detail</h3>
					<div class="form-group">
						<input type="text" class="form-control" ref={f => this.name = f} placeholder="Name...." />
					</div>
					<div class="form-group">
						<input type="number" class="form-control" ref={f => this.age = f} placeholder="Age...." />
					</div>
					<div className="form-group">
						<select ref={f => this.gender = f} className="form-control">
							<option value="none">-- Select Gender --</option>
							<option value="female">Female</option>
							<option value="male">Male</option>
						</select>
					</div>
					<div className="form-group">
						<input type="text" ref={f => this.company = f} className="form-control" placeholder="Company...." />
					</div>
					<div className="form-group">
						<input type="email" className="form-control" placeholder="Email..." ref={f => this.email = f} />
					</div>
					<div className="form-group">
						<input type="number" className="form-control" ref={f => this.phone = f} placeholder="Phone..." />
					</div>
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-addon">&#8377;</div>
							<input type="number" className="form-control" ref={f => this.balance = f} placeholder="Balance..." />
						</div>
					</div>
					<hr />
					<div class="form-group">
						<button className="btn btn-primary" onClick={this.addUser.bind(this)}>Submit</button>
					</div>
				</div>
			</div>
		);
	}
}


@connect((store) => {
	return { ...store };
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
	addForm() {
		this.props.dispatch(showForm());
	}
	componentWillMount() {
		this.props.dispatch(getList());
	}
	render() {
		let data = this._getFilterdList();
		return (
			<div>
				<button type="button" className={this.props.showForm ? "btn btn-primary hide" : "btn btn-primary"} onClick={this.addForm.bind(this)}>Add</button>
				<div id="form" className={this.props.showForm ? "" : "hide"}>
					<Form {...this.props} />
				</div>
				<input type="text" className="form-control table-search" value={this.props.filter} placeholder="Search by name ....." onChange={this.onFilter.bind(this)} />
				<Table rows={data}></Table>
			</div>
		);
	}
}
