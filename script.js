const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

const todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        let li = document.createElement('li');
        li.textContent = todo.text;
        todoList.appendChild(li);

    })
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.value.trim();
    if (inputValue === "")return;

    const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
    }
    todos.push(newTodo);
    saveToLocalStorage();
    renderTodos();
    todoInput.value = "";
})



