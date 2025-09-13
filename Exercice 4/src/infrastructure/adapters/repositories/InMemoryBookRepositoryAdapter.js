const BookRepositoryPort = require("../../../domain/boundaries/output/BookRepositoryPort");

class InMemoryBookRepositoryAdapter extends BookRepositoryPort {
    constructor() {
        super();
        this.books = [];
    }

    save(book) {
        this.books.push(book);
        return book;
    }

    findAll() {
        return this.books;
    }

    findById(id) {
        return this.books.find(b => b.id === id);
    }
}

module.exports = InMemoryBookRepositoryAdapter;
