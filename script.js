const form = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");
const taskPriorityInput = document.getElementById("task-priority");
const taskTableBody = document.getElementById("task-table-body");

let tasks = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = taskNameInput.value.trim();
  const priority = taskPriorityInput.value;

  if (!name || !priority) return;

  const task = {
    id: Date.now(),
    name,
    priority,
  };

  tasks.push(task);
  renderTasks();

  form.reset();
});

function renderTasks() {
  taskTableBody.innerHTML = "";

  tasks.forEach((task) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.name}</td>
      <td>
        <span class="badge bg-${getPriorityColor(task.priority)}">${task.priority}</span>
      </td>
      <td>
        <button class="btn btn-success btn-sm" onclick="completeTask(${task.id})">Concluir</button>
      </td>
    `;

    taskTableBody.appendChild(row);
  });
}

function completeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}

function getPriorityColor(priority) {
  switch (priority) {
    case "Alta":
      return "danger";
    case "Média":
      return "warning";
    case "Baixa":
      return "secondary";
    default:
      return "light";
  }
}
