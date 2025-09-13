const ListBooksInputPort = require("../../domain/boundaries/input/ListBooksInputPort");

class ListBooksUseCase extends ListBooksInputPort {
    constructor(repository, presenter) {
        super();
        this.repository = repository;
        this.presenter = presenter;
    }

    execute() {
        try {
            const books = this.repository.findAll();
            this.presenter.presentBooks(books);
        } catch (err) {
            this.presenter.presentError(err.message);
        }
    }
}

module.exports = ListBooksUseCase;
