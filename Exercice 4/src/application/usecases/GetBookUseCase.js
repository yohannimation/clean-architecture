const GetBookInputPort = require("../../domain/boundaries/input/GetBookInputPort");

class GetBookUseCase extends GetBookInputPort {
    constructor(repository, presenter) {
        super();
        this.repository = repository;
        this.presenter = presenter;
    }

    execute(bookId) {
        try {
            const book = this.repository.findById(bookId);
            if (!book) throw new Error("Book not found");
            this.presenter.presentBook(book);
        } catch (err) {
            this.presenter.presentError(err.message);
        }
    }
}

module.exports = GetBookUseCase;
