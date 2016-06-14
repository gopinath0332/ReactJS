// ReactDOM.render(<h1>Hello there!</h1>, document.getElementById("holder"));
var [target] = $("#holder");
ReactDOM.render(<h1>Hello there!</h1>, target);
