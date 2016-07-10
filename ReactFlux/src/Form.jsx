var React = require("react"),
    ReactDom = require("react-dom"),
    $ = require("jquery");
import actions from "./actions";

const style = {
    holder: {
        "border-bottom": "1px solid #ddd"
    },
    form: {
        "width": "300px",
        "margin": "0px 0px 10px 10px"
    }
};
var Form = React.createClass({
    handleSubmit: function() {
        var form = $("#registerForm :input");
        var val = {};
        form.each(function() {
            val[this.name] = this.value;
        });
        val["id"] = Date.now();
        actions.addStudent(val);
        [form] = document.forms;
        form.reset();
    },
    render: function() {
        return (
            <div class="myForm" style={style.holder}>
                <form id="registerForm" style={style.form} class="register form-horizontal">
                    <input type="text" name="first_name" className="form-control" placeholder="First Name.."/>
                    <input type="text" name="last_name" className="form-control" placeholder="Last Name.."/>
                    <input type="text" name="email" className="form-control" placeholder="Email.."/>
                    <input type="text" name="gender" className="form-control" placeholder="Gender.."/>
                </form>
                <button class="btn btn-success" onClick={this.handleSubmit}>Register</button>
            </div>
        );
    }
});

export default Form;
Form;
