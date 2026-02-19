// ===============================
// UI ELEMENTS
// ===============================
const taskForm = document.getElementById("taskForm");
const taskTableBody = document.querySelector("#taskTable tbody");
const notification = document.getElementById("notification");

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const capInput = document.getElementById("capInput");
const capMessage = document.getElementById("capMessage");
const unitSelect = document.getElementById("unitSelect");

const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const fileInput = document.getElementById("fileInput");
const clearAllBtn = document.getElementById("clearAll");

// ===============================
// NOTIFICATION
// ===============================
function showMessage(message, isError = false) {
  notification.textContent = message;
  notification.style.color = isError ? "red" : "green";

  setTimeout(() => {
    notification.textContent = "";
  }, 3000);
}

// ===============================
// ADD TASK
// ===============================
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("dueDate").value;
  const duration = document.getElementById("duration").value;
  const tag = document.getElementById("tag").value.trim();

  if (!validateTask(title, date, duration, tag)) return;

  const newTask = createTask(title, date, duration, tag);

  tasks.push(newTask);
  saveToStorage(tasks);
  renderTasks(tasks);
  updateStats();
  taskForm.reset();

  showMessage("Task added!");
});

// ===============================
// CLEAR ALL TASKS
// ===============================
clearAllBtn.addEventListener("click", () => {

  if (tasks.length === 0) {
    showMessage("No tasks to clear.", true);
    return;
  }

  if (confirm("Are you sure you want to delete ALL tasks?")) {

    tasks = [];
    localStorage.removeItem("alu_tasks");

    renderTasks();
    updateStats();

    showMessage("All tasks cleared.");
  }
});

// ===============================
// CAP SYSTEM
// ===============================
capInput.addEventListener("input", (e) => {
  const cap = Number(e.target.value);
  const total = tasks.reduce((sum, t) => sum + Number(t.duration), 0);

  if (total > cap) {
    capMessage.setAttribute("aria-live", "assertive");
    capMessage.textContent = "You exceeded your target!";
  } else {
    capMessage.setAttribute("aria-live", "polite");
    capMessage.textContent = "Remaining: " + (cap - total);
  }
});

// ===============================
// UNIT CONVERSION
// ===============================
unitSelect.addEventListener("change", (e) => {
  const unit = e.target.value;

  if (unit === "hours") {
    tasks.forEach(t => t.duration = (t.duration / 60).toFixed(2));
  }

  if (unit === "minutes") {
    tasks.forEach(t => t.duration = Math.round(t.duration * 60));
  }

  renderTasks();
});

// ===============================
// EXPORT JSON
// ===============================
exportBtn.addEventListener("click", () => {
  const data = JSON.stringify(tasks, null, 2);

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "tasks.json";
  a.click();

  URL.revokeObjectURL(url);

  showMessage("Export successful!");
});

// ===============================
// IMPORT JSON
// ===============================
importBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const importedData = JSON.parse(event.target.result);

      if (!Array.isArray(importedData)) {
        showMessage("Invalid JSON format.", true);
        return;
      }

      tasks = importedData;
      saveToStorage(tasks);
      renderTasks();
      updateStats();

      showMessage("Import successful!");
    } catch (error) {
      showMessage("Invalid JSON file.", true);
    }
  };

  reader.readAsText(file);
});

// ===============================
// INITIAL LOAD
// ===============================
renderTasks();
updateStats();

