const express = require("express");
const path = require("path");

const InMemoryBookRepositoryAdapter = require("./src/infrastructure/adapters/repositories/InMemoryBookRepositoryAdapter");
const AddBookUseCase = require("./src/application/usecases/AddBookUseCase");
const ListBooksUseCase = require("./src/application/usecases/ListBooksUseCase");
const GetBookUseCase = require("./src/application/usecases/GetBookUseCase");
const BookController = require("./src/infrastructure/adapters/controllers/BookController");

// Dépendances
const repository = new InMemoryBookRepositoryAdapter();

// API Presenter (adapter JSON)
class BookApiPresenter {
    constructor(res) {
        this.res = res;
    }

    presentBooks(books) {
        this.res.json(books);
    }

    presentBook(book) {
        this.res.json(book);
    }

    presentError(error) {
        this.res.status(400).json({ error });
    }
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

// Routes API
app.post("/books", (req, res) => {
    const presenter = new BookApiPresenter(res);
    const useCase = new AddBookUseCase(repository, presenter);
    const controller = new BookController(useCase, null, null);
    controller.addBook(req.body);
});

app.get("/books", (req, res) => {
    const presenter = new BookApiPresenter(res);
    const useCase = new ListBooksUseCase(repository, presenter);
    const controller = new BookController(null, useCase, null);
    controller.listBooks();
});

app.get("/books/:id", (req, res) => {
    const presenter = new BookApiPresenter(res);
    const useCase = new GetBookUseCase(repository, presenter);
    const controller = new BookController(null, null, useCase);
    controller.getBook(req.params.id);
});

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
