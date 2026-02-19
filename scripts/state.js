// ===============================
// STATE & DATA MODEL
// ===============================
let tasks = loadFromStorage();
let currentRegex = null;

function createTask(title, date, duration, tag) {
  const now = new Date().toISOString();

  return {
    id: "rec_" + Date.now(),
    title,
    date,
    duration: Number(duration),
    tag,
    createdAt: now,
    updatedAt: now
  };
}

// ===============================
// DELETE TASK
// ===============================
function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter(t => t.id !== id);
    saveToStorage(tasks);
    renderTasks();
    updateStats();
  }
}

