
// Todo-appen
const todoList = document.getElementById(
  "todo-list"
) as HTMLUListElement | null;
const todoForm = document.getElementById("todo-form") as HTMLFormElement | null;
const todoInput = document.getElementById(
  "todo-input"
) as HTMLInputElement | null;

// Lyssna på när formuläret skickas in (tex när användaren trycker på "Lägg till")
todoForm?.addEventListener("submit", (e) => {
  e.preventDefault(); // Hindra att sidan laddas om

  // Hämta/ta bort mellanslag från inmatningsfältet
  const task = todoInput?.value.trim();

  // Om fältet är tomt eller null, gör ingenting
  if (todoInput?.value == "" || todoInput?.value == null) return
 
})



// Hamburger-menylogik
const hamburger = document.querySelector(
  ".hamburger"
) as HTMLButtonElement | null;
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}
