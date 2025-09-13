document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addBookForm");
    const listBtn = document.getElementById("listBooksBtn");
    const getBtn = document.getElementById("getBookBtn");
    const results = document.getElementById("results");
  
    // Ajouter un livre
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const isbn = document.getElementById("isbn").value;
  
      const res = await fetch("/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, isbn })
      });
  
      const data = await res.json();
      results.innerHTML = `<p>Livre ajouté : ${data.title} (${data.isbn})</p>`;
      form.reset();
    });
  
    // Lister les livres
    listBtn.addEventListener("click", async () => {
      const res = await fetch("/books");
      const data = await res.json();
      results.innerHTML = `
        <h3>📚 Liste des livres :</h3>
        <ul>
          ${data.map(b => `<li>[${b.id}] ${b.title} - ${b.author} (${b.isbn})</li>`).join("")}
        </ul>
      `;
    });
  
    // Rechercher par ID
    getBtn.addEventListener("click", async () => {
      const id = document.getElementById("bookId").value;
      if (!id) return alert("Veuillez entrer un ID");
  
      const res = await fetch(`/books/${id}`);
      const data = await res.json();
  
      if (data.error) {
        results.innerHTML = `<p style="color:red;">❌ ${data.error}</p>`;
      } else {
        results.innerHTML = `<p>[${data.id}] ${data.title} - ${data.author} (${data.isbn})</p>`;
      }
    });
  });
  