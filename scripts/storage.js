// ===============================
// STORAGE
// ===============================
function saveToStorage(tasks) {
  localStorage.setItem("alu_tasks", JSON.stringify(tasks));
}

function loadFromStorage() {
  return JSON.parse(localStorage.getItem("alu_tasks")) || [];
}

