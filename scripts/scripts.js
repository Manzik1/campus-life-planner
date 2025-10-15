const form = document.getElementById('taskForm');
const tableBody = document.querySelector('#taskTable tbody');
const totalTasks = document.getElementById('totalTasks');
const totalDuration = document.getElementById('totalDuration');
const searchInput = document.getElementById('searchInput');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// ===== Regex Patterns =====
// 1. Description/title: no leading/trailing spaces, no double spaces
const titleRegex = /^\S(?:.*\S)?$/;

// 2. Numeric field (duration) — only positive numbers (optional decimals)
const durationRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

// 3. Date: YYYY-MM-DD format
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

// 4. Category/tag: letters, spaces, or hyphens
const tagRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

// 5. Advanced regex (back-reference): detect duplicate words in title
const duplicateWordRegex = /\b(\w+)\s+\1\b/i;


// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Calculate and update dashboard stats
function updateStats() {
  totalTasks.textContent = tasks.length;
  const totalTime = tasks.reduce((sum, task) => sum + Number(task.duration), 0);
  totalDuration.textContent = totalTime;
}

// Display tasks
function renderTasks(filteredTasks = tasks) {
  tableBody.innerHTML = '';
  filteredTasks.forEach(task => {
    const row = document.createElement('tr');
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

// Add new task
function addTask(task) {
  tasks.push(task);
  saveTasks();
  renderTasks();
}

// Edit task
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  document.getElementById('taskId').value = task.id;
  document.getElementById('title').value = task.title;
  document.getElementById('dueDate').value = task.dueDate;
  document.getElementById('duration').value = task.duration;
  document.getElementById('tag').value = task.tag;
}

// Delete task
function deleteTask(id) {
  if (confirm('Delete this task?')) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
  }
}

// Handle form submission
form.addEventListener('submit', e => {
  e.preventDefault();

  const id = document.getElementById('taskId').value;
  const title = document.getElementById('title').value.trim();
  const dueDate = document.getElementById('dueDate').value;
  const duration = document.getElementById('duration').value.trim();
  const tag = document.getElementById('tag').value.trim();
//  Regex validation
if (!titleRegex.test(title)) {
  showNotification(" Title can't start/end with spaces or contain double spaces.", true);
  return;
}

if (duplicateWordRegex.test(title)) {
  showNotification(" Title has duplicate words (e.g., 'study study').", true);
  return;
}

if (!durationRegex.test(duration)) {
  showNotification(" Duration must be a positive number (e.g., 45 or 60.5).", true);
  return;
}

if (!dateRegex.test(dueDate)) {
  showNotification(" Date must be in YYYY-MM-DD format.", true);
  return;
}

if (!tagRegex.test(tag)) {
  showNotification(" Tag must contain only letters, spaces, or hyphens.", true);
  return;
}

  if (id) {
    // Update existing task
    const task = tasks.find(t => t.id === id);
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
      updatedAt: new Date().toISOString()
    };
    addTask(newTask);
  }

  form.reset();
  document.getElementById('taskId').value = '';
  saveTasks();
  renderTasks();
});

// Search functionality
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(query) ||
    t.tag.toLowerCase().includes(query) ||
    t.dueDate.includes(query)
  );
  renderTasks(filtered);
});

// Initialize
renderTasks();
// Clear all tasks
const clearAllBtn = document.getElementById('clearAll');
clearAllBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to delete ALL tasks? This cannot be undone.")) {
    tasks = [];
    localStorage.removeItem('tasks');
    renderTasks();
  }
});
// ===== JSON EXPORT =====
const exportBtn = document.getElementById('exportJSON');
exportBtn.addEventListener('click', () => {
  if (tasks.length === 0) {
    alert("No tasks to export.");
    return;
  }
  const dataStr = JSON.stringify(tasks, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "campus_tasks_backup.json";
  a.click();
  URL.revokeObjectURL(url);
});

// ===== JSON IMPORT =====
const importBtn = document.getElementById('importJSON');
const fileInput = document.getElementById('fileInput');

importBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', event => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);

      //  Validate the imported data
      if (!Array.isArray(imported)) throw new Error("Invalid JSON format");

      const valid = imported.every(t =>
        t.id && t.title && t.dueDate && t.duration && t.tag
      );

      if (!valid) throw new Error("Some records are missing required fields.");

      if (confirm("Importing will replace your current tasks. Continue?")) {
        tasks = imported;
        saveTasks();
        renderTasks();
        alert(" Tasks imported successfully!");
      }
    } catch (err) {
      alert(" Failed to import JSON: " + err.message);
    }
  };
  reader.readAsText(file);
});
// Show notification (success or error)
function showNotification(message, isError = false) {
  const note = document.getElementById('notification');
  note.textContent = message;
  note.className = isError ? 'show error' : 'show';

  setTimeout(() => {
    note.className = 'hidden';
  }, 2500);
}

