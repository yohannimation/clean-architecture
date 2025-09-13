const InMemoryBookRepositoryAdapter = require("../adapters/repositories/InMemoryBookRepositoryAdapter");
const BookConsolePresenter = require("../adapters/presenters/BookConsolePresenter");
const AddBookUseCase = require("../../../application/usecases/AddBookUseCase");
const ListBooksUseCase = require("../../../application/usecases/ListBooksUseCase");
const GetBookUseCase = require("../../../application/usecases/GetBookUseCase");
const BookController = require("../adapters/controllers/BookController");

// Dépendances
const repository = new InMemoryBookRepositoryAdapter();
const presenter = new BookConsolePresenter();

// Use Cases
const addBookUseCase = new AddBookUseCase(repository, presenter);
const listBooksUseCase = new ListBooksUseCase(repository, presenter);
const getBookUseCase = new GetBookUseCase(repository, presenter);

// Controller
const controller = new BookController(addBookUseCase, listBooksUseCase, getBookUseCase);

// Simulation
controller.addBook({ title: "Clean Architecture", author: "Robert C. Martin", isbn: "9780134494166" });
controller.addBook({ title: "Domain-Driven Design", author: "Eric Evans", isbn: "9780321125217" });
controller.addBook({ title: "Refactoring", author: "Martin Fowler", isbn: "9780201485677" });

controller.listBooks();
controller.getBook("123"); // ID inexistant → erreur
