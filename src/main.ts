// Todo-interface
export interface Todo {
  task: string;
  completed: boolean;
  priority: 1 | 2 | 3;
}

// TodoList-klass som hanterar "to-dos" och LocalStorage
export class TodoList {
  private todos: Todo[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  // Lägg till en ny "to-do", returnerar true om lyckat, annars false
  addTodo(task: string, priority: number): boolean {
    // Kontrollera att task inte är tom och att priority är 1, 2 eller 3
    if (!task || typeof task !== "string" || ![1, 2, 3].includes(priority)) {
      return false;
    }
    const newTodo: Todo = {
      task: task.trim(),
      completed: false,
      priority: priority as 1 | 2 | 3,
    };
    this.todos.push(newTodo);
    this.saveToLocalStorage();
    return true;
  }

  // Markera en "to-do" som klar
  markTodoCompleted(todoIndex: number): void {
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      this.todos[todoIndex].completed = true;
      this.saveToLocalStorage();
    }
  }

  // hämta alla "to-dos"
  getTodos(): Todo[] {
    return [...this.todos]; // Returnera en kopia
  }

  // Spara "to-dos" till LocalStorage
  saveToLocalStorage(): void {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  // Ladda "to-dos" från LocalStorage
  loadFromLocalStorage(): void {
    const data = localStorage.getItem("todos");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          // Kontrollera att varje objekt matchar Todo-interfacet
          this.todos = parsed.filter(
            (t: any) =>
              typeof t.task === "string" &&
              typeof t.completed === "boolean" &&
              [1, 2, 3].includes(t.priority)
          );
        }
      } catch {
        this.todos = [];
      }
    }
  }
}

// To do-appen
const todoListElement = document.getElementById(
  "todo-list"
) as HTMLUListElement | null;
const todoForm = document.getElementById("todo-form") as HTMLFormElement | null;
const todoInput = document.getElementById(
  "todo-input"
) as HTMLInputElement | null;

// Skapa select för prioritet
enum Priority {
  Viktigast = 1,
  Viktig = 2,
  MindreViktig = 3,
}
let todoPriority = document.getElementById(
  "todo-priority"
) as HTMLSelectElement | null;
if (!todoPriority && todoForm) {
  todoPriority = document.createElement("select");
  todoPriority.id = "todo-priority";
  todoPriority.innerHTML = `
    <option value="1">Prio 1</option>
    <option value="2">Prio 2</option>
    <option value="3">Prio 3 </option>
  `;
  todoInput?.after(todoPriority);
}

const errorMsg = document.createElement("div");
errorMsg.id = "todo-error";
errorMsg.style.color = "#c00";
todoForm?.appendChild(errorMsg);

const todoManager = new TodoList();

// Ta bort-funktionalitet 
// Ta bort en specifik todo
function removeTodo(todoIndex: number): void {
  const todos = todoManager.getTodos();
  if (todoIndex >= 0 && todoIndex < todos.length) {
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    todoManager.loadFromLocalStorage();
  }
}

function renderTodos() {
  if (!todoListElement) return;
  todoListElement.innerHTML = "";
  todoManager.getTodos().forEach((todo, i) => {
    const li = document.createElement("li");
    li.textContent = `${todo.task} (Prio ${todo.priority})`;

    if (todo.completed) {
      // Skapa en span för texten så vi kan styla den separat
      const textSpan = document.createElement("span");
      textSpan.textContent = `${todo.task} (Prio ${todo.priority})`;
      textSpan.style.textDecoration = "line-through";
      textSpan.style.opacity = "0.5";
      li.textContent = ""; 
      li.appendChild(textSpan);

      // Lägg till kryss-knapp för klara todos
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "×";
      removeBtn.className = "remove-todo-btn";
      removeBtn.onclick = () => {
        removeTodo(i);
        renderTodos();
      };
      li.appendChild(removeBtn);
    } else {
      const doneBtn = document.createElement("button");
      doneBtn.innerHTML = "✓";
      doneBtn.className = "mark-completed-btn";
      doneBtn.onclick = () => {
        todoManager.markTodoCompleted(i);
        renderTodos();
      };
      li.appendChild(doneBtn);
    }
    todoListElement.appendChild(li);
  });
}

renderTodos();

// Lyssna på när formuläret skickas in (tex när användaren trycker på "Lägg till")
todoForm?.addEventListener("submit", (e) => {
  e.preventDefault(); // Hindra att sidan laddas om
  errorMsg.textContent = "";
  const task = todoInput?.value.trim() || "";
  const priority = todoPriority ? Number(todoPriority.value) : 1;
  const success = todoManager.addTodo(task, priority);
  if (!success) {
    errorMsg.textContent =
      "Du måste ange en uppgift och välja prio 1, 2 eller 3.";
    return;
  }
  todoInput!.value = "";
  renderTodos();
});

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
