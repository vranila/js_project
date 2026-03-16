const taskList = document.getElementById("taskList");

loadTasks();

function addTask() {

  const taskInput = document.getElementById("taskInput");
  const dueDate = document.getElementById("dueDate");
  const category = document.getElementById("category").value;
  const priority = document.getElementById("priority").value;

  const taskText = taskInput.value;

  if (taskText === "") {
    alert("Enter task");
    return;
  }

  const li = document.createElement("li");

  if (priority === "High") li.classList.add("high");
  if (priority === "Medium") li.classList.add("medium");
  if (priority === "Low") li.classList.add("low");

  li.innerHTML = `
    <span onclick="toggleComplete(this)">
      ${taskText} | ${category} | Due: ${dueDate.value}
    </span>

    <div class="actions">

      <button onclick="editTask(this)">Edit</button>

      <button onclick="deleteTask(this)">Delete</button>

    </div>
  `;

  taskList.appendChild(li);

  scheduleReminder(taskText, dueDate.value);

  taskInput.value = "";
  dueDate.value = "";

  updateProgress();
  saveTasks();
}

function toggleComplete(el) {

  el.parentElement.classList.toggle("completed");

  updateProgress();
  saveTasks();

}

function editTask(btn) {

  const span = btn.parentElement.previousElementSibling;

  const newTask = prompt("Edit Task", span.innerText);

  if (newTask) {
    span.innerText = newTask;
  }

  saveTasks();

}

function deleteTask(btn) {

  btn.parentElement.parentElement.remove();

  updateProgress();
  saveTasks();

}

function searchTask() {

  const filter = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const tasks = document.querySelectorAll("li");

  tasks.forEach(task => {

    const text = task.innerText.toLowerCase();

    task.style.display = text.includes(filter)
      ? "flex"
      : "none";

  });

}

document
  .getElementById("searchInput")
  .addEventListener("keyup", searchTask);

function updateProgress() {

  const tasks = document.querySelectorAll("#taskList li");

  const completed =
    document.querySelectorAll(".completed");

  const percent =
    tasks.length === 0
      ? 0
      : (completed.length / tasks.length) * 100;

  document.getElementById("progressBar").style.width =
    percent + "%";

}

function saveTasks() {

  localStorage.setItem(
    "tasks",
    taskList.innerHTML
  );

}

function loadTasks() {

  taskList.innerHTML =
    localStorage.getItem("tasks") || "";

  updateProgress();

}

function scheduleReminder(task, date) {

  if (!date) return;

  const dueTime = new Date(date).getTime();
  const now = new Date().getTime();

  const delay = dueTime - now;

  if (delay > 0) {

    setTimeout(() => {

      alert("Reminder: " + task);

    }, delay);

  }

}

document
  .getElementById("darkModeBtn")
  .onclick = () =>
    document.body.classList.toggle("dark");