const React = require("react"),
    ReactDom = require("react-dom"),
    $ = require("jquery");

var Rows = React.createClass({
    render: function() {
        var item = this.props.item;
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.gender}</td>
                <td>{item.Country}</td>
            </tr>
        )
    }
});

var Body = React.createClass({
    getInitialState: function() {
        return {"bodyFilteCount": 0};
    },
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    updateCount: function(count, filterStr) {
        var [countNode] = $("#count");
        if (countNode) {
            $("#count").html(count);
        }
    },
    render: function() {
        var filterData = this.props.filter;
        var data = this.props.data;
        data = data.filter((item) => {
            return item.first_name.toLowerCase().indexOf(filterData.toLowerCase()) >= 0;
        });
        var filterRow = data.map((item) => {
            return (
                <Rows item={item} key={item.id}></Rows>
            )
        });
        return (
            <tbody onComplete={this.updateCount(filterRow.length, filterData)}>{filterRow}</tbody>
        );
    }
});

var Table = React.createClass({
    getInitialState: function() {
        return {"data": [], "filter": "", "recordCount": 0};
    },
    onFIlter: function(e) {
        this.setState({"filter": e.target.value});
    },
    updateTotalRecord: function(count) {
        this.setState({"recordCount": count});
    },
    render: function() {
        const pageStyle = {
            inputStyle: {
                "margin-right": "10px",
                "width": "250px",
                "display": "inline-block"
            },
            tableStyle: {
                "margin": "5px 0px 0px 0px",
                "width": "700px"
            },
            viewStyle: {
                "margin": "10px"
            }
        };
        return (
            <div style={pageStyle.viewStyle}>
                <input class="form-control" onChange={this.onFIlter} value={this.state.filter} placeholder="Filter Firstname...." style={pageStyle.inputStyle}></input>
                <span>Records:
                    <span id="count">{this.state.recordCount}</span>
                </span>
                <table class="table table-hover" style={pageStyle.tableStyle}>
                    <thead>
                        <tr>
                            <th>###</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <Body filter={this.state.filter} data={this.props.data}></Body>
                </table>
            </div>
        );
    }
});

export default Table;
