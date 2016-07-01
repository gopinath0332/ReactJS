var React = require("react"),
    ReactDom = require("react-dom"),
    $ = require("jquery");

const [targetNode] = $("#content");
var blobData = [
    {
        name: "Jhonny",
        "comment": "Comment from Jhonny"
    }, {
        name: "Jhonny1",
        "comment": "Comment from Jhonny1"
    }, {
        name: "Jhonny2",
        "comment": "Comment from Jhonny2"
    }
];

var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        console.debug("Component mounted::::");
        $.ajax({
            url: this.props.url,
            dataType: "json",
            cache: false,
            success: function(response) {
                this.setState({data: response});
            }.bind(this),
            error: function(error) {
                console.error("Error in fetching data:::", error);
            }
        });
    },
    handleCommentSubmit: function(comment) {
        console.debug("submitteed comment::", comment);
        var currentData = this.state.data;
        console.debug("current data", currentData);
        currentData.splice(0, 0, {
            name: comment.name,
            about: comment.comment
        });
        this.setState({data: currentData});
    },
    render: function() {
        console.debug("rendering Comment list::");
        return (
            <div className="commentbox">
                <h1>React Components</h1>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}></CommentForm>
                <h1>Comments</h1>
                <CommentList data={this.state.data}></CommentList>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var nodes = this.props.data.map((item, index) => {
            return (
                <Comment author={item.name} key={index + 1}>{item.about}</Comment>
            );
        });

        console.debug("comment list:::::", nodes);
        return (
            <div className="commentList">{nodes}</div>
        )

    }
});

var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
                <h4 className="commentAuthor">{this.props.author}</h4>
                <p>{this.props.children}</p>
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleNameChange: function(e) {
        this.state.name = e.target.value;
        // this.setState({ name: e.target.valule });
    },
    handleCommentChange: function(e) {
        // this.setState({ comment: e.target.valule });
        this.state.comment = e.target.value;
    },
    handleSubmit: function() {
        this.props.onCommentSubmit(this.state);
        // this.setState({ name: "", comment: "" });
    },
    getInitialState: function() {
        return {name: "", comment: ""};
    },
    render: function() {
        var styles = {
            "padding-right": "20px"
        };
        return (
            <div className="commentForm">
                <label htmlFor="author" style={styles}>Author</label>
                <input id="author" type="text" onChange={this.handleNameChange} placeholder="Username..."/><br/><br/>
                <label htmlFor="comment" style={styles}>Comments</label>
                <input id="comment" type="text" onChange={this.handleCommentChange} placeholder="Comment..."/><br/><br/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
});

ReactDom.render(
    <CommentBox url="./js/profile.json"></CommentBox>, targetNode);
