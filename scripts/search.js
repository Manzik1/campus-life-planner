// ===============================
// HIGHLIGHT
// ===============================
function highlight(text, regex) {
  if (!regex) return text;
  return text.replace(regex, match => `<mark>${match}</mark>`);
}

// ===============================
// RENDER TASKS
// ===============================
function renderTasks(taskArray = tasks, regex = currentRegex) {
  taskTableBody.innerHTML = "";

  taskArray.forEach(task => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.id}</td>
      <td>${highlight(task.title, regex)}</td>
      <td>${task.date}</td>
      <td>${task.duration}</td>
      <td>${highlight(task.tag, regex)}</td>
      <td>
        <button onclick="deleteTask('${task.id}')">Delete</button>
      </td>
    `;

    taskTableBody.appendChild(row);
  });
}

// ===============================
// SORTING
// ===============================
sortSelect.addEventListener("change", (e) => {
  const value = e.target.value;

  if (value === "date") {
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  if (value === "title") {
    tasks.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (value === "duration") {
    tasks.sort((a, b) => a.duration - b.duration);
  }

  renderTasks();
});

// ===============================
// LIVE REGEX SEARCH
// ===============================
searchInput.addEventListener("input", (e) => {
  const pattern = e.target.value;

  try {
    currentRegex = new RegExp(pattern, "i");

    const filtered = tasks.filter(task =>
      currentRegex.test(task.title) ||
      currentRegex.test(task.tag)
    );

    renderTasks(filtered, currentRegex);

  } catch (error) {
    currentRegex = null;
    renderTasks(tasks);
  }
});

// ===============================
// UPDATE STATS
// ===============================
function updateStats() {

  document.getElementById("totalTasks").textContent = tasks.length;

  const totalDuration = tasks.reduce((sum, t) => sum + Number(t.duration), 0);
  document.getElementById("totalDuration").textContent = totalDuration;

  const tagCount = {};
  tasks.forEach(t => {
    tagCount[t.tag] = (tagCount[t.tag] || 0) + 1;
  });

  const topTag = Object.keys(tagCount)
    .sort((a,b) => tagCount[b] - tagCount[a])[0];

  document.getElementById("topTag").textContent = topTag || "None";

  const now = new Date();
  const last7 = tasks.filter(t => {
    const taskDate = new Date(t.date);
    return (now - taskDate) / (1000*60*60*24) <= 7;
  }).length;

  document.getElementById("last7").textContent = last7;
}

