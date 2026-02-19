const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

const todos = [];

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.value.trim();
    console.log(inputValue);

    const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
    }
    todos.push(newTodo);
    saveToLocalStorage();
})