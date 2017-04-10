export function getBooks(){
  return {
    "type":"GET_BOOKS"
  };
}

export function addBook(name){
  return {
    "type":"ADD_BOOK",
    "payload": name
  };
}

export function deleteBook(id){
  
}