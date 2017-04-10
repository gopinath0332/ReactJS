import React,{Component} from "react";
import {connect} from "react-redux";

import {addBook} from "../actions/books";

@connect((store)=>{
  return{
    books: store.books.books,
    // dispatch: store.dispatch
  }
})
class Layout extends Component{
  constructor(){
    super();
    this.addBook = this.addBook.bind(this);
  }
  addBook(){
    console.debug(this.bookName.value);
    let value = this.bookName.value;
    this.props.dispatch(addBook(value));
  }
  render(){
    console.debug("books::",this.props);
    const bookList = this.props.books.map((book)=><li id={book.id}>{book.name}</li>);
    return (<div className="container-fluid">
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Enter book name..." ref={(node)=>this.bookName = node}></input>
        <button className="btn btn-primary" onClick={this.addBook}>Add</button>
        <hr/>
        <ul>
          {bookList}
        </ul>
      </div>
    </div>);
  }
}


export default Layout;