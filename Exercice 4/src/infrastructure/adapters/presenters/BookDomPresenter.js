const BookOutputPort = require("../../../domain/boundaries/output/BookOutputPort");

class BookDomPresenter extends BookOutputPort {
    constructor(domElement) {
        super();
        this.domElement = domElement; // <div id="results">
    }

    presentBooks(books) {
        this.domElement.innerHTML = `
            <h3>📚 Liste des livres :</h3>
            <ul>
                ${books.map(b => `<li>[${b.id}] ${b.title} - ${b.author} (${b.isbn})</li>`).join("")}
            </ul>
        `;
    }

    presentBook(book) {
        this.domElement.innerHTML = `
            <h3>📖 Livre trouvé :</h3>
            <p>[${book.id}] ${book.title} - ${book.author} (${book.isbn})</p>
        `;
    }

    presentError(error) {
        this.domElement.innerHTML = `<p style="color:red;">❌ Erreur : ${error}</p>`;
    }
}

module.exports = BookDomPresenter;
