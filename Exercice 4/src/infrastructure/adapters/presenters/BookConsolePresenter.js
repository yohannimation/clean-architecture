const BookOutputPort = require("../../../domain/boundaries/output/BookOutputPort");

class BookConsolePresenter extends BookOutputPort {
    presentBooks(books) {
        console.log("📚 Liste des livres :");
        books.forEach(b => console.log(`- [${b.id}] ${b.title} - ${b.author} (${b.isbn})`));
    }

    presentBook(book) {
        console.log("📖 Livre :", book);
    }

    presentError(error) {
        console.error("❌ Erreur :", error);
    }
}

module.exports = BookConsolePresenter;
