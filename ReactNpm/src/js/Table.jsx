const React = require("react"),
    ReactDom = require("react-dom"),
    $ = require("jquery");

const [targetNode] = $("#content");
const tableStyle = {
    "tbody": {
        "height": "300px",
        "overflow": "auto"
    }
};
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
        return {"bodyFilter": ""};
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
            <tbody>{filterRow}</tbody>
        );
    }
});

var Table = React.createClass({
    getInitialState: function() {
        return {"data": [], "filter": ""};
    },
    componentDidMount: function() {
        this.fetchData();
    },
    fetchData: function() {
        $.ajax({
            url: this.props.url,
            dataType: "json",
            cache: false,
            success: (response) => {
                this.setState({"data": response});
            },
            error: (error) => {
                console.error("Error in fetching table data:::", error);
            }
        });
    },
    onFIlter: function(e) {
        this.setState({"filter": e.target.value});
    },
    render: function() {
        return (
            <div>
                <input onChange={this.onFIlter} value={this.state.filter} placeholder="Enter string....."></input>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>##</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <Body filter={this.state.filter} data={this.state.data}></Body>
                </table>
            </div>
        );
    }
});

ReactDom.render(
    <Table url="js/mockTable.json"></Table>, targetNode);
