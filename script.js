const input = document.querySelector("input");
const button = document.querySelector("button");
const todolist = document.querySelector(".list");
const TODOS_KEY = "todos";

function init() {
  count();
  renderList();
}
init();

button.addEventListener("click", () => {
  let inputValue = input.value;

  if (!inputValue) return alert("Invalid Input!");

  let existingTodos = getTodos();
  let newData;
  let newTodo = {
    id: Date.now(),
    value: inputValue,
    isComplete: false,
  };

  if (existingTodos) {
    newData = [...existingTodos, newTodo];
  } else {
    newData = [newTodo];
  }

  localStorage.setItem(TODOS_KEY, JSON.stringify(newData));
  input.value = "";
  init();
});

function getTodos() {
  let todoStr = localStorage.getItem(TODOS_KEY);

  if (!todoStr) return null;

  let parsedData;

  try {
    parsedData = JSON.parse(todoStr);
  } catch (error) {
    alert("Failed to parse JSON string!");
    console.log(error);
  }

  return parsedData;
}

function count() {
  let count = 0;
  let existingTodos = getTodos();

  if (existingTodos) {
    count = existingTodos.length;
  }

  document.querySelector(".tasks-count").textContent = `${count} tasks`;
}

function renderList() {
  let todos = getTodos();

  if (!todos) return;

  let htmlContent = "";

  todos.forEach((todo) => {
    htmlContent += `
            <div class="todo">
          <p class="${todo.isComplete ? "completed" : ""}">${todo.value}</p>
          <div class="wrapper">
            <img src="" alt="" style="display: ${todo.isComplete ? "inline" : "none"}" />
          </div>
        </div>
    `;
  });
  todolist.innerHTML = htmlContent;
}
