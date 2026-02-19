// 1. DOM ელემენტების მონიშვნა
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyMsg = document.getElementById('empty-msg');

// 2. STATE - მონაცემების საცავი
// ვცდილობთ წავიკითხოთ LocalStorage-დან, თუ არ არის, ვიღებთ ცარიელ მასივს
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 3. ფუნქცია: მონაცემების შენახვა LocalStorage-ში
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 4. ფუნქცია: სიის გამოტანა ეკრანზე (Render)
function renderTodos() {
    // სიის გასუფთავება დუბლირების თავიდან ასაცილებლად
    todoList.innerHTML = '';

    // შევამოწმოთ სია ცარიელია თუ არა
    if (todos.length === 0) {
        emptyMsg.classList.remove('hidden');
    } else {
        emptyMsg.classList.add('hidden');
    }

    // ციკლი მასივზე და HTML-ის შექმნა
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        // HTML სტრუქტურის ჩასმა
        li.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <div class="actions">
                <!-- ყურადღება: onclick-ში ვიძახებთ გლობალურ ფუნქციებს ID-ის გადაცემით -->
                <button class="btn-check" onclick="toggleComplete(${todo.id})">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn-delete" onclick="deleteTodo(${todo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        todoList.appendChild(li);
    });
}

// 5. EVENT: ახალი ტასკის დამატება
todoForm.addEventListener('submit', function (e) {
    e.preventDefault(); // გვერდის დარეფრეშების გაჩერება

    const inputValue = todoInput.value.trim(); // ზედმეტი ჰარების მოცილება

    if (inputValue === '') return; // ცარიელი ინპუტის შემოწმება

    // ახალი ობიექტის შექმნა
    const newTodo = {
        id: Date.now(), // უნიკალური ID დროის მიხედვით
        text: inputValue,
        completed: false
    };

    // მასივში დამატება
    todos.push(newTodo);

    // შენახვა და თავიდან დახატვა
    saveToLocalStorage();
    renderTodos();

    // ინპუტის გასუფთავება
    todoInput.value = '';
});

// 6. FUNCTION: ტასკის წაშლა (გლობალური ფუნქცია)
window.deleteTodo = function (id) {
    // ვიტოვებთ მხოლოდ იმ ელემენტებს, რომლის ID-ც არ ემთხვევა წასაშლელს
    todos = todos.filter(todo => todo.id !== id);

    saveToLocalStorage();
    renderTodos();
};

// 7. FUNCTION: სტატუსის შეცვლა (Check/Uncheck)
window.toggleComplete = function (id) {
//     TODO: სტატუსის შეცვლის ფუნქციონალი
};

// აპლიკაციის ჩატვირთვისას გამოვიძახოთ რენდერი, რომ შენახული ტასკები გამოჩნდეს
renderTodos();
