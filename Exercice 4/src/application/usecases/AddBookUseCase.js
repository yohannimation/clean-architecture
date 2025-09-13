const AddBookInputPort = require("../../domain/boundaries/input/AddBookInputPort");
const Book = require("../../domain/entities/Book");

class AddBookUseCase extends AddBookInputPort {
    constructor(repository, presenter) {
        super();
        this.repository = repository;
        this.presenter = presenter;
    }

    execute(bookData) {
        try {
            const book = new Book({
                id: Date.now().toString(),
                title: bookData.title,
                author: bookData.author,
                isbn: bookData.isbn
            });

            this.repository.save(book);
            this.presenter.presentBook(book);
        } catch (err) {
            this.presenter.presentError(err.message);
        }
    }
}

module.exports = AddBookUseCase;
