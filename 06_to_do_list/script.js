/* -------------------- DOM Elements -------------------- */
const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const pendingList = document.getElementById("pendingTasks");
const completedList = document.getElementById("completedTasks");
const addBtn = document.getElementById("addTask");
const darkBtn = document.getElementById("darkBtn");

let chart;
let calendar;
let editingTask = null; // Currently editing task

/* -------------------- ADD / UPDATE TASK -------------------- */
addBtn.addEventListener("click", function () {
    const text = taskInput.value.trim();
    const date = dueDate.value;
    const level = priority.value;

    if (text === "") {
        alert("Enter task");
        return;
    }

    if (editingTask) {
        // Update existing task
        editingTask.querySelector(".taskText").textContent = text;
        editingTask.className = ""; // Reset class
        editingTask.classList.add(level.toLowerCase());
        editingTask.dataset.date = date;
        editingTask.dataset.priority = level;

        editingTask = null;
        addBtn.textContent = "Add Task";
    } else {
        // Add new task
        const li = document.createElement("li");
        li.classList.add(level.toLowerCase());
        li.dataset.date = date;
        li.dataset.priority = level;
        li.innerHTML = `
            <span class="taskText">${text}</span>
            <div class="actions">
                <button class="done">✓</button>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
        pendingList.appendChild(li);

        addCalendarEvent(text, date);
        scheduleNotification(text, date);
    }

    taskInput.value = "";
    dueDate.value = "";
    priority.value = "Low";

    saveTasks();
    updateChart();
});

/* -------------------- DARK MODE -------------------- */
darkBtn.addEventListener("click", () => document.body.classList.toggle("dark"));

/* -------------------- TASK BUTTON ACTIONS -------------------- */
document.addEventListener("click", function (e) {
    const li = e.target.closest("li");
    if (!li) return;

    if (e.target.classList.contains("done")) {
        completedList.appendChild(li);
        e.target.remove();
        saveTasks();
        updateChart();
    }

    if (e.target.classList.contains("delete")) {
        li.remove();
        saveTasks();
        updateChart();
    }

    if (e.target.classList.contains("edit")) {
        taskInput.value = li.querySelector(".taskText").textContent;
        dueDate.value = li.dataset.date || "";
        priority.value = li.dataset.priority || "Low";
        addBtn.textContent = "Update Task";
        editingTask = li;
    }
});

/* -------------------- DRAG & DROP -------------------- */
new Sortable(pendingList, { group: "tasks", animation: 150 });
new Sortable(completedList, { group: "tasks", animation: 150 });

/* -------------------- SAVE & LOAD TASKS -------------------- */
function saveTasks() {
    const data = {
        pending: pendingList.innerHTML,
        completed: completedList.innerHTML,
    };
    localStorage.setItem("tasks", JSON.stringify(data));
}

function loadTasks() {
    const data = localStorage.getItem("tasks");
    if (!data) return;
    try {
        const tasks = JSON.parse(data);
        pendingList.innerHTML = tasks.pending || "";
        completedList.innerHTML = tasks.completed || "";
    } catch {
        localStorage.clear();
    }
    updateChart();
}
loadTasks();

/* -------------------- CHART -------------------- */
function updateChart() {
    const pending = pendingList.children.length;
    const completed = completedList.children.length;
    const ctx = document.getElementById("taskChart");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Pending", "Completed"],
            datasets: [{ data: [pending, completed] }],
        },
    });
}

/* -------------------- CALENDAR -------------------- */
document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
    });
    calendar.render();
});

function addCalendarEvent(task, date) {
    if (!date || !calendar) return;
    calendar.addEvent({ title: task, start: date });
}

/* -------------------- NOTIFICATIONS -------------------- */
if ("Notification" in window) Notification.requestPermission();

function scheduleNotification(task, date) {
    if (!date) return;
    const due = new Date(date).getTime();
    const now = new Date().getTime();
    const delay = due - now;

    if (delay > 0) {
        setTimeout(() => new Notification("Task Reminder", { body: task }), delay);
    }
}