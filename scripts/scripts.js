// Get all needed elements
const form = document.getElementById("taskForm");
const tableBody = document.querySelector("#taskTable tbody");
const totalTasks = document.getElementById("totalTasks");
const totalDuration = document.getElementById("totalDuration");
const searchInput = document.getElementById("searchInput");
const clearAllBtn = document.getElementById("clearAll");
const exportBtn = document.getElementById("exportJSON");
const importBtn = document.getElementById("importJSON");
const fileInput = document.getElementById("fileInput");

// Load tasks from localStorage or start empty
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ------------------------------
// Helper Functions
// ------------------------------

// Save all tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update the total tasks and total duration numbers
function updateStats() {
  totalTasks.textContent = tasks.length;
  const totalTime = tasks.reduce((sum, t) => sum + Number(t.duration), 0);
  totalDuration.textContent = totalTime;
}

// Show tasks in the table
function renderTasks(filtered = tasks) {
  tableBody.innerHTML = "";

  filtered.forEach((task) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.dueDate}</td>
      <td>${task.duration}</td>
      <td>${task.tag}</td>
      <td class="actions">
        <button class="edit" onclick="editTask('${task.id}')">Edit</button>
        <button class="delete" onclick="deleteTask('${task.id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  updateStats();
}

// Save a new task to the list
function addTask(task) {
  tasks.push(task);
  saveTasks();
  renderTasks();
}

// ------------------------------
// Edit & Delete Tasks
// ------------------------------

// Fill the form with a task’s info to edit it
function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  document.getElementById("taskId").value = task.id;
  document.getElementById("title").value = task.title;
  document.getElementById("dueDate").value = task.dueDate;
  document.getElementById("duration").value = task.duration;
  document.getElementById("tag").value = task.tag;
}

// Remove a task from the list
function deleteTask(id) {
  if (confirm("Delete this task?")) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    renderTasks();
  }
}

// ------------------------------
// Form Submission (Add or Edit)
// ------------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("taskId").value;
  const title = document.getElementById("title").value.trim();
  const dueDate = document.getElementById("dueDate").value;
  const duration = document.getElementById("duration").value.trim();
  const tag = document.getElementById("tag").value.trim();

  // Simple input validation
  if (!title || !dueDate || !duration || !tag) {
    showNotification("Please fill out all fields", true);
    return;
  }

  if (isNaN(duration) || duration <= 0) {
    showNotification("Duration must be a positive number", true);
    return;
  }

  if (id) {
    // Update existing task
    const task = tasks.find((t) => t.id === id);
    task.title = title;
    task.dueDate = dueDate;
    task.duration = duration;
    task.tag = tag;
    task.updatedAt = new Date().toISOString();
  } else {
    // Create new task
    const newTask = {
      id: Date.now().toString(),
      title,
      dueDate,
      duration,
      tag,
      createdAt: new Date().toISOString(),
    };
    addTask(newTask);
  }

  form.reset();
  document.getElementById("taskId").value = "";
  saveTasks();
  renderTasks();
  showNotification("Task saved!");
});

// ------------------------------
// Search for Tasks
// ------------------------------
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(query) ||
      t.tag.toLowerCase().includes(query) ||
      t.dueDate.includes(query)
  );
  renderTasks(filtered);
});

// ------------------------------
// Clear All Tasks
// ------------------------------
clearAllBtn.addEventListener("click", () => {
  if (confirm("Delete ALL tasks? This cannot be undone.")) {
    tasks = [];
    localStorage.removeItem("tasks");
    renderTasks();
    showNotification("All tasks cleared!");
  }
});

// ------------------------------
// Export to JSON File
// ------------------------------
exportBtn.addEventListener("click", () => {
  if (tasks.length === 0) {
    showNotification("No tasks to export.", true);
    return;
  }

  const dataStr = JSON.stringify(tasks, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "alu_tasks_backup.json";
  a.click();
  URL.revokeObjectURL(url);

  showNotification("Tasks exported!");
});

// ------------------------------
// Import from JSON File
// ------------------------------
importBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) throw new Error("Invalid JSON format");

      if (confirm("Importing will replace your current tasks. Continue?")) {
        tasks = imported;
        saveTasks();
        renderTasks();
        showNotification("Tasks imported!");
      }
    } catch (err) {
      showNotification("Import failed: " + err.message, true);
    }
  };
  reader.readAsText(file);
});

// ------------------------------
// Small Popup Notifications
// ------------------------------
function showNotification(message, isError = false) {
  const note = document.getElementById("notification");
  note.textContent = message;
  note.className = isError ? "show error" : "show";

  setTimeout(() => {
    note.className = "hidden";
  }, 2500);
}
renderTasks();
