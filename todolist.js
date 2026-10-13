// A standard todo list array initialized with sample data
let todoList = [
  {
    id: 1,
    text: "Buy groceries",
    completed: false
  },
  {
    id: 2,
    text: "Finish JavaScript project",
    completed: true
  },
  {
    id: 3,
    text: "Walk the dog",
    completed: false
  }
];
const todoListUl = document.getElementById("task-list");
const addTaskBtn = document.getElementById('add-task-btn');
const CreateTodoForm = document.querySelector('.todo-form')

function createTodoLi(todoItem) {
  const li = document.createElement("li");
  li.className = "text-xl py-2 text-gray-700";
  li.dataset.id = todoItem.id;

  const isChecked = todoItem.completed ? "checked" : "";
  const textDecoration = todoItem.completed ? "line-through" : "none";
  const textColor = todoItem.completed ? "gray" : "black";

  li.innerHTML = `<input type='checkbox' class='todo-box' ${isChecked}/> <span class='todo-text' style='cursor: pointer; text-decoration: ${textDecoration}; color: ${textColor};'>${todoItem.text}</span> <button type='button' class='delete-btn'>Delete</button>`;
  return li;
}
function showTodoList() {
  todoListUl.innerHTML = "";
  todoList.forEach((item) => {
    const todoItem = createTodoLi(item);
    todoListUl.appendChild(todoItem);
  });
}
showTodoList();


CreateTodoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formTodos = new FormData(event.target);
  const data = Object.fromEntries(formTodos.entries());
  const newTodoText = (data['todo-input'] || "").trim();

  // Don't create the todo item if it is empty`
  if (!newTodoText) {
    return;
  }

  const newTodoItem = {
    id: todoList.length > 0 ? Math.max(...todoList.map((t) => t.id)) + 1 : 1,
    text: newTodoText,
    completed: false
  };

  todoList.push(newTodoItem);
  const createItem = createTodoLi(newTodoItem);
  todoListUl.appendChild(createItem);
  event.target.reset();
});

function updateTodoItemUI(checkbox, todoText, todoItem) {
  if (todoItem) {
    todoItem.completed = checkbox.checked;
  }
  if (checkbox.checked) {
    todoText.style.textDecoration = 'line-through';
    todoText.style.color = 'gray';
  } else {
    todoText.style.textDecoration = 'none';
    todoText.style.color = 'black';
  }
}

// Click listener on todo list: toggles checkbox and strikes through text whether user clicks the text or checkbox
todoListUl.addEventListener('click', (event) => {
  const target = event.target;
  const li = target.closest('li');
  if (!li) return;

  const todoId = Number(li.dataset.id);

  if (target.classList.contains('delete-btn')) {
    deleteTodoItem(todoId);
    return;
  }

  const checkbox = li.querySelector('.todo-box');
  const todoText = li.querySelector('.todo-text');
  const todoItem = todoList.find((item) => item.id === todoId);

  if (target.classList.contains('todo-text')) {
    checkbox.checked = !checkbox.checked;
    updateTodoItemUI(checkbox, todoText, todoItem);
  } else if (target.classList.contains('todo-box')) {
    updateTodoItemUI(checkbox, todoText, todoItem);
  }
});

addTaskBtn.addEventListener('click', (event) => {
  if (addTaskBtn.innerText.trim().toLocaleLowerCase() === "add todo") {
    CreateTodoForm.style.display = "flex";
    addTaskBtn.innerText = "Cancel";
  } else if (addTaskBtn.innerText.trim().toLocaleLowerCase() === "cancel") {
    CreateTodoForm.style.display = "none";
    addTaskBtn.innerText = "Add Todo";
  }
});

function updateTodo(id) {
  const todoItem = todoList.find((value) => value.id === Number(id));
  if (!todoItem) return null;

  todoItem.completed = !todoItem.completed;
  const li = todoListUl.querySelector(`li[data-id="${id}"]`);
  if (li) {
    const checkbox = li.querySelector('.todo-box');
    const todoText = li.querySelector('.todo-text');
    if (checkbox) checkbox.checked = todoItem.completed;
    if (todoText) {
      todoText.style.textDecoration = todoItem.completed ? 'line-through' : 'none';
      todoText.style.color = todoItem.completed ? 'gray' : 'black';
    }
  }
  return todoItem;
}

function deleteTodoItem(id) {
  todoList = todoList.filter((todoItem) => todoItem.id !== Number(id));
  const li = todoListUl.querySelector(`li[data-id="${id}"]`);
  if (li) li.remove();
}
