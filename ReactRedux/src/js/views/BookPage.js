import React,{Component} from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import { connect } from 'react-redux';
import * as bookActions from '../actions/bookAction';

let [target] = $("#content");

class Book extends Component{
  constructor(args){
    super(args);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(){
    let book = this.bookCat.value;
    let count = this.catCount.value;
    console.debug(book,"---",count);
    this.props.createBook(book);
  }
  render() {
    let books = this.props.books.map((book,index)=>{ 
      return <li className="list-group-item" key={index}><span className="badge right">{book.total}</span>{book.title}</li>});
    return (
      <div className="container-fluid">
        <div className="panel panel-primary">
          <div className="panel panel-heading">
            <h3>Book Form</h3>
          </div>
          <div className="panel  panel-body">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Book Category" ref={(node)=>this.bookCat = node}/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Count.." className="form-control" ref={(node)=>this.catCount =node}/>
            </div>
            <button className="btn btn-primary submit right" onClick={this.onSubmit}>Add</button>
          </div>
        </div>
          <div className="row">
            <h2>Books</h2>
            <ul className="list-group">
              {books}
            </ul>
          </div>
      </div>
    );
  }
}

// ReactDOM.render(<Book books={books}></Book>,target);
Book.defaultProps ={
  books :[{title:"Science",total: 20},{title:"Mathematics",total:40},{title:"Adeventure",total:15}]
};

const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.books
    books: state.books
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  // You can now say this.props.createBook
    createBook: book => dispatch(bookActions.createBook(book))
  }
};
// export default Book;
export default connect(mapStateToProps, mapDispatchToProps)(Book);
