const createBook = (book)=>{
  return {type:"CREATE_BOOK",book:book};
};

export default createBook;