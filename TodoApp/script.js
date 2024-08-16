// 페이지가 로드될 때 로컬 스토리지에서 할일 목록을 가져옴
document.addEventListener('DOMContentLoaded', loadTodos);

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToList(todo));
}

document.getElementById('add-button').addEventListener('click', function() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        addTodoToList(todoText);
        saveTodoToLocalStorage(todoText);
        todoInput.value = '';
    }
});

function addTodoToList(todoText) {
    const todoList = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.textContent = todoText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        deleteTodoFromLocalStorage(todoText);
        todoList.removeChild(li);
    });

    li.appendChild(deleteButton);
    todoList.appendChild(li);
}

function saveTodoToLocalStorage(todoText) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodoFromLocalStorage(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}
