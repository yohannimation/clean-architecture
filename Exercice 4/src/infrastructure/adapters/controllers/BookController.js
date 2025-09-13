class BookController {
    constructor(addBookUseCase, listBooksUseCase, getBookUseCase) {
        this.addBookUseCase = addBookUseCase;
        this.listBooksUseCase = listBooksUseCase;
        this.getBookUseCase = getBookUseCase;
    }
    
    addBook(bookData) {
        this.addBookUseCase.execute(bookData);
    }
    
    listBooks() {
        this.listBooksUseCase.execute();
    }
    
    getBook(bookId) {
        this.getBookUseCase.execute(bookId);
    }
}

module.exports = BookController;
